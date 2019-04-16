benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

CurrentUser = require '../../../../models/current_user'
Sale = require '../../../../models/sale'
RegistrationForm = require '../../client/registration_form'
DateHelpers = require '../../../../components/util/date_helpers.coffee'

describe 'RegistrationForm', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery'),
        Stripe: @Stripe =
          sinon.stub().returns({
            createToken: sinon.stub().returns(Promise.resolve({ token: { id: '123' } }))
            elements: sinon.stub().returns({
              create: sinon.stub().returns({
                update: sinon.stub()
                mount: sinon.stub()
              })
            })
          })
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @submitStub = sinon.stub(Backbone, 'sync')

    @sale = new Sale fabricate 'sale'

    benv.render resolve(__dirname, '../../templates/registration.jade'), {
      sd: {}
      sale: @sale
      monthRange: [1..12]
      yearRange: DateHelpers.getYearRange()
      asset: ->
    }, =>
      @view = new RegistrationForm
        el: $('#auction-registration-page')
        model: @sale
        success: sinon.stub()
      @view.currentUser = new CurrentUser fabricate 'user'
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#submit', ->

    beforeEach ->
      @acceptTerms = => @view.$acceptConditions.prop('checked', true)
      @submitValidForm = =>
        @view.$('input[name="card_name"]').val 'Foo Bar'
        @view.$('input[name="address[street]"]').val '456 Foo Bar Ln.'
        @view.$('input[name="address[city]"]').val 'Foobarrington'
        @view.$('input[name="address[region]"]').val 'FB'
        @view.$('input[name="address[postal_code]"]').val '90210'
        @view.$('input[name="telephone"]').val '555-555-5555'
        @view.$submit.click()

    it 'still succeeds if the API throws an error for having already created a bidder',  (done) ->
      # Successfully save phone number
      Backbone.sync.onFirstCall().yieldsTo('success')
      # Successfully save credit card
      Backbone.sync.onSecondCall().yieldsTo('success')
      # Fail to create the bidder
      Backbone.sync.onThirdCall().yieldsTo('error', { responseJSON: { message: 'Sale is already taken.' } })

      @view.on "submitted", =>
        @view.success.called.should.be.ok()
        done()
      @acceptTerms()
      @submitValidForm()

    xit 'validates the form and displays errors', (done) ->
      @view.$submit.length.should.be.ok()
      @acceptTerms()
      @view.$submit.click()

      @view.on "submitted", =>
        html = @view.$el.html()
        html.should.containEql 'Invalid name on card'
        html.should.containEql 'Invalid city'
        html.should.containEql 'Invalid state'
        html.should.containEql 'Invalid zip'
        html.should.containEql 'Invalid telephone'
        html.should.containEql 'Please review the error(s) above and try again.'
        done()

    it 'lets the user resubmit a corrected form', ->
      @acceptTerms()

      # Submit a bad form
      @view.$submit.length.should.be.ok()
      @view.$submit.click()
      @view.once "submitted", =>
        html = @view.$el.html()
        html.should.containEql 'Please review the error(s) above and try again.'

        # Now submit a good one
        Backbone.sync
          .yieldsTo 'success', {} # savePhoneNumber success
          .onCall 1
          .yieldsTo 'success', { get: () -> 'pass' } # credit card save passes
          .onCall 2
          .yieldsTo 'success', {}

        @view.$submit.removeClass('is-loading')
        @submitValidForm()

        @view.once "submitted", =>
          # Saves the phone number
          Backbone.sync.args[0][2].attrs.phone.should.equal '555-555-5555'

          # Saves the credit card
          Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/credit_cards'
          Backbone.sync.args[1][2].success()

          # Creates the bidder
          Backbone.sync.args[2][1].attributes.sale_id.should.equal @sale.id
          Backbone.sync.args[2][2].url.should.containEql '/api/v1/bidder'

    it 'submits the form correctly', ->
      # Successfully save phone number
      Backbone.sync.onFirstCall().yieldsTo('success')
      # Successfully save credit card
      Backbone.sync.onSecondCall().yieldsTo('success')
      # Successfully create the bidder
      Backbone.sync.onThirdCall().yieldsTo('success')
      @acceptTerms()
      @submitValidForm()

      @view.on "submitted", =>
        # Saves the phone number
        Backbone.sync.args[0][1].changed.phone.should.equal '555-555-5555'

        # Saves the credit card
        Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/credit_cards'
        Backbone.sync.args[1][2].success()

        # Creates the bidder
        Backbone.sync.args[2][1].attributes.sale_id.should.equal @sale.id
        Backbone.sync.args[2][2].url.should.containEql '/api/v1/bidder'

    it 'does not submit the form if Conditions of Sale are not accepted', ->
      spy = sinon.spy(@submitStub)
      @submitValidForm()
      spy.called.should.be.false()

    it 'adds an error class on submit if Conditions of Sale are not accepted', ->
      @submitValidForm()
      @view.$('.artsy-checkbox').hasClass('error').should.be.true()
