benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

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
      monthRange: DateHelpers.getMonthRange()
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
      @acceptConditions = => @view.$acceptConditions.prop('checked', true)
      @submitValidForm = =>
        @view.$('input[name="card_name"]').val 'Foo Bar'
        @view.$('input[name="address[street]"]').val '456 Foo Bar Ln.'
        @view.$('input[name="address[city]"]').val 'Foobarrington'
        @view.$('input[name="address[region]"]').val 'FB'
        @view.$('input[name="address[postal_code]"]').val '90210'
        @view.$('input[name="telephone"]').val '555-555-5555'
        @view.$submit.click()

    it 'still succeeds if the API throws an error for having already created a bidder', (done) ->
      Backbone.sync
        .yieldsTo 'success', {} # savePhoneNumber success
        .onCall 1
        .yieldsTo 'success', { get: () -> 'pass' } # credit card save success
        .onCall 2
        .yieldsTo 'error', { responseJSON: { message: 'Sale is already taken.' } } # bidder creation failure

      @acceptConditions()
      @submitValidForm()

      @view.once 'submitted', ->
        done()

    it 'validates the form and displays errors', (done) ->
      @acceptConditions()

      @view.$submit.length.should.be.ok()
      @view.$submit.click()

      @view.once 'submitted', =>
        html = @view.$el.html()
        html.should.containEql 'This field is required'
        @view.$submit.hasClass('is-loading').should.be.false()
        done()

    it 'lets the user resubmit a corrected form', (done) ->
      @acceptConditions()

      # Submit a bad form
      @view.$submit.length.should.be.ok()
      @view.$submit.click()

      @view.once "submitted", =>
        html = @view.$el.html()
        html.should.containEql 'This field is required'

        Backbone.sync
          .yieldsTo 'success', {} # savePhoneNumber success
          .onCall 1
          .yieldsTo 'success', { get: () -> 'pass' } # credit card save passes
          .onCall 2
          .yieldsTo 'success', {}

        # Now submit a good one
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
          done()

    it 'shows an error when the ZIP check fails', (done) ->
      Backbone.sync
        .yieldsTo 'success', {} # savePhoneNumber success
        .onCall 1
        .yieldsTo 'success', { address_zip_check: 'fail', cvc_check: 'pass' } # credit card save failure
        .onCall 2
        .yieldsTo 'success', {}

      @acceptConditions()
      @submitValidForm()

      @view.once "submitted", =>
        html = @view.$el.html()
        html.should.containEql "The ZIP code provided did not match your card number."
        done()

    it 'shows an error when the CVV check fails', (done) ->
      Backbone.sync
        .yieldsTo 'success', {} # savePhoneNumber success
        .onCall 1
        .yieldsTo 'success', { address_zip_check: 'pass', cvc_check: 'fail' } # credit card save failure
        .onCall 2
        .yieldsTo 'success', {}

      @acceptConditions()
      @submitValidForm()

      @view.once "submitted", =>
        html = @view.$el.html()
        html.should.containEql "The security code provided did not match your card number."
        done()

    it 'submits the form correctly', (done) ->
      Backbone.sync
        .yieldsTo 'success', {} # savePhoneNumber success
        .onCall 1
        .yieldsTo 'success', { get: () -> 'pass' } # credit card save passes
        .onCall 2
        .yieldsTo 'success', {}

      @acceptConditions()
      @submitValidForm()

      @view.once "submitted", =>
        # Saves the phone number
        Backbone.sync.args[0][1].attributes.phone.should.equal '555-555-5555'

        # Saves the credit card
        Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/credit_cards'

        # Creates the bidder
        Backbone.sync.args[2][1].attributes.sale_id.should.equal @sale.id
        Backbone.sync.args[2][2].url.should.containEql '/api/v1/bidder'

        done()

    it 'does not submit the form if Conditions of Sale are not accepted', ->
      spy = sinon.spy(@submitStub)
      @submitValidForm()
      spy.called.should.be.false()

    it 'adds an error class on submit if Conditions of Sale are not accepted', ->
      @submitValidForm()
      @view.$('.artsy-checkbox').hasClass('error').should.be.true()
