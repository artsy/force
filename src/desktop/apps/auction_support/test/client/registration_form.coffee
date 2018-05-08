benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

CurrentUser = require '../../../../models/current_user'
Order = require '../../../../models/order'
Sale = require '../../../../models/sale'
RegistrationForm = require '../../client/registration_form'

describe 'RegistrationForm', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery'),
        Stripe: @Stripe =
          setPublishableKey: sinon.stub()
          card:
            createToken: sinon.stub().yields(200, {})
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @submitStub = sinon.stub(Backbone, 'sync')#.yieldsTo('success')

    @order = new Order()
    @sale = new Sale fabricate 'sale'

    benv.render resolve(__dirname, '../../templates/registration.jade'), {
      sd: {}
      sale: @sale
      monthRange: @order.getMonthRange()
      yearRange: @order.getYearRange()
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
      @acceptTerms = => @view.$acceptTerms.prop('checked', true)
      @submitValidForm = =>
        @view.$('input[name="card_name"]').val 'Foo Bar'
        @view.$('select[name="card_expiration_month"]').val '1'
        @view.$('select[name="card_expiration_year"]').val '2024'
        @view.$('input[name="card_number"]').val '4111111111111111'
        @view.$('input[name="card_security_code"]').val '123'
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

      @acceptTerms()
      @submitValidForm()

      @view.once 'submitted', =>
        done()

    it 'validates the form and displays errors', ->
      @view.$submit.length.should.be.ok()
      @view.$submit.click()

      @view.once 'submitted', =>
        html = @view.$el.html()
        html.should.containEql 'Invalid name on card'
        html.should.containEql 'Invalid card number'
        html.should.containEql 'Invalid security code'
        html.should.containEql 'Invalid city'
        html.should.containEql 'Invalid state'
        html.should.containEql 'Invalid zip'
        html.should.containEql 'Invalid telephone'
        html.should.containEql 'Please review the error(s) above and try again.'
        @view.$submit.hasClass('is-loading').should.be.false()

    it 'lets the user resubmit a corrected form', ->
      # Submit a bad form

      @view.$submit.length.should.be.ok()
      @view.$submit.click()
      @view.once "submitted", =>
        html = @view.$el.html()
        html.should.containEql 'Please review the error(s) above and try again.'

        # Now submit a good one

        # Successfully create a stripe token
        @Stripe.card.createToken.callsArgWith(1, 200, {})
        # Successfully save phone number
        Backbone.sync.onFirstCall().yieldsTo('success')
        # Successfully save credit card
        Backbone.sync.onSecondCall().yieldsTo('success')
        # Successfully create the bidder
        Backbone.sync.onThirdCall().yieldsTo('success')


        @acceptTerms()
        @submitValidForm()
        @view.once "submitted", =>
          @Stripe.card.createToken.args[0][1](200, {})

          # Saves the phone number
          Backbone.sync.args[0][1].changed.phone.should.equal '555-555-5555'

          # Saves the credit card
          Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/credit_cards'
          Backbone.sync.args[1][2].success()

          # Creates the bidder
          Backbone.sync.args[2][1].attributes.sale_id.should.equal @sale.id
          Backbone.sync.args[2][2].url.should.containEql '/api/v1/bidder'

    it 'shows an error when the ZIP check fails', (done) ->
      Backbone.sync
        .yieldsTo 'success', {} # savePhoneNumber success
        .onCall 1
        .yieldsTo 'success', { address_zip_check: 'fail', cvc_check: 'pass' } # credit card save failure
        .onCall 2
        .yieldsTo 'success', {}

      @acceptTerms()
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

      @acceptTerms()
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

      @acceptTerms()
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
