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
            createToken: sinon.stub()
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub(Backbone, 'sync')#.yieldsTo('success')

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

    it 'still succeeds if the API throws an error for having already created a bidder', ->
      @submitValidForm()
      @Stripe.card.createToken.args[0][1](200, {})
      # Save credit card
      Backbone.sync.args[1][2].success()
      # Creates the bidder
      Backbone.sync.args[2][2].error { responseJSON: { message: 'Sale is already taken.' } }
      @view.success.called.should.be.ok

    it 'validates the form and displays errors', ->
      @view.$submit.length.should.be.ok
      @view.$submit.click()
      html = @view.$el.html()
      html.should.containEql 'Invalid name on card'
      html.should.containEql 'Invalid card number'
      html.should.containEql 'Invalid security code'
      html.should.containEql 'Invalid city'
      html.should.containEql 'Invalid state'
      html.should.containEql 'Invalid zip'
      html.should.containEql 'Invalid telephone'
      html.should.containEql 'Please review the error(s) above and try again.'
      @view.$submit.hasClass('is-loading').should.be.false

    it 'submits the form correctly', ->
      @submitValidForm()
      @Stripe.card.createToken.args[0][1](200, {})

      # Saves the phone number
      Backbone.sync.args[0][1].changed.phone.should.equal '555-555-5555'

      # Saves the credit card
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/credit_cards'
      Backbone.sync.args[1][2].success()

      # Creates the bidder
      Backbone.sync.args[2][1].attributes.sale_id.should.equal @sale.id
      Backbone.sync.args[2][2].url.should.containEql '/api/v1/bidder'
