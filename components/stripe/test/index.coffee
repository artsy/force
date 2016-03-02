benv = require 'benv'
sinon = require 'sinon'
stripe = require '../index'
Stripe = {}

describe 'stripe', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        Stripe: Stripe
      done()

  after ->
    benv.teardown()

  beforeEach ->
    Stripe.card =
      validateCardNumber: sinon.stub()
      validateExpiry: sinon.stub()
      validateCVC: sinon.stub()
      createToken: sinon.stub()
      cardType: sinon.stub()

  describe '#isValid', ->
    beforeEach ->
      @card =
        number: '6666666666666666'
        exp: '10/2020'
        cvc: '666'

    it 'returns true if all the validators are also true', ->
      Stripe.card.validateCardNumber.returns true
      Stripe.card.validateExpiry.returns true
      Stripe.card.validateCVC.returns true

      stripe.isValid @card
        .should.be.true()

    it 'returns false if any one of the validators is false', ->
      Stripe.card.validateCardNumber.returns true
      Stripe.card.validateExpiry.returns false
      Stripe.card.validateCVC.returns true

      stripe.isValid @card
        .should.be.false()

  describe '#serialize', ->
    it 'pulls out data from sensitive fields marked with the `data-stripe` attribute', ->
      $el = $ """
        <form>
          <input name='foo'>
          <input data-stripe='cc_number'>
          <input data-stripe='cvc'>
        </form>
      """

      $el.find('[name="foo"]').val 'Bar'
      $el.find('[data-stripe="cc_number"]').val '6666666666666666'
      $el.find('[data-stripe="cvc"]').val '666'

      stripe.serialize $el
        .should.eql
          cc_number: '6666666666666666'
          cvc: '666'

  describe '#tokenize', ->
    it 'wraps Stripe’s `createToken` with a Promise', ->
      Stripe.card.createToken.yields 200, id: 'existy'

      stripe.tokenize {}
        .then ({ id }) ->
          id.should.equal 'existy'
