rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
_ = require 'underscore'
Order = require '../../../../models/order'
CheckoutForm = require('../../client/checkout_form')
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'CheckoutForm', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        Stripe: @Stripe =
          setPublishableKey: sinon.stub()
          card:
            createToken: sinon.stub()
      sinon.stub global, 'setInterval'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()
    global.setInterval.restore()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/checkout.jade'), {
      sd: {}
      order: new Order(fabricate 'order')
      asset: (->)
    }, =>
      @success = false
      @view = new CheckoutForm
        el: $('body')
        model: new Order(fabricate 'order')
        success: => @success = true
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets up @fields', ->
      @view.fields['name on card'].el.length.should.equal 1
      @view.fields['card number'].el.length.should.equal 1
      @view.fields['security code'].el.length.should.equal 1
      @view.fields.billing_street.el.length.should.equal 1
      @view.fields.billing_city.el.length.should.equal 1
      @view.fields.billing_state.el.length.should.equal 1
      @view.fields.billing_zip.el.length.should.equal 1
      @view.fields.conditions.el.length.should.equal 1

  describe '#internationalizeFields', ->

    it 'changes to Postal Code for non-USA countries', ->
      @view.$('.postal-code label').text().should.equal 'Zip code'
      @view.$('select.country').val 'UZB'
      @view.$('select.country').trigger 'change'
      @view.$('.postal-code label').text().should.equal 'Postal Code'

  describe '#onSubmit', ->

    xit 'shows errors for empty fields', ->
      @view.onSubmit()
      @view.$('.error').text().should.equal 'Invalid name on cardInvalid monthInvalid yearInvalid card numberInvalid security codeInvalid streetInvalid cityInvalid stateInvalid billing_zipConditions must be acceptedPlease review the error(s) above and try again.'

    it 'runs success callback', ->
      @view.fields['name on card'].el.val 'Name McName'
      @view.fields['card number'].el.val '4111111111111111'
      @view.fields['security code'].el.val '123'
      @view.fields.billing_street.el.val 'Easystreet'
      @view.fields.billing_city.el.val 'Cool city'
      @view.fields.billing_state.el.val 'NY'
      @view.fields.billing_zip.el.val '11238'
      @view.fields.month.el.val '12'
      @view.fields.year.el.val '2025'
      @view.fields.conditions.el.prop('checked', true)
      @view.onSubmit()
      @view.$('.error').text().should.equal ''
      # Just call the cardCallback
      @view.cardCallback 200, { id: 'super-cool-credit-card-token' }
      _.last(Backbone.sync.args)[2].success {}
      @success.should.equal true

  describe '#toggleShippingAddress', ->

    it 'clears the inputs', ->
      @view.$('.credit-card-form-hidden').show().find(':input').first().val '401 broadway'
      @view.$('.credit-card-form-checkbox input').removeAttr('checked')
      @view.toggleShippingAddress()
      @view.$('.credit-card-form-hidden').show().find(':input').first().val().should.equal ''
