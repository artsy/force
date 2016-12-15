benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
CreditCardView = benv.requireWithJadeify require.resolve('../view.coffee'), ['template']
stripe = CreditCardView.__get__ 'stripe'
CreditCardView.__set__ 'jQueryPayment', sinon.stub()

describe 'CreditCardView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub stripe, 'initialize'
    sinon.stub CreditCardView::, 'postRender'

    @user = new CurrentUser id: 'foobar'
    @view = new CreditCardView collection: @user.related().creditCards

  afterEach ->
    stripe.initialize.restore()
    @view.postRender.restore()

  describe '#render', ->
    it 'renders the template', ->
      html = @view.render().$el.html()
      html.should.containEql 'Credit Card Number'
      html.should.containEql 'Name on Credit Card'
      html.should.containEql 'Add Payment'

  describe '#submit', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'

      @view.render()

      sinon.stub @view, 'validate'

    afterEach ->
      Backbone.sync.restore()
      stripe.tokenize.restore()

    describe 'successful', ->
      beforeEach ->
        sinon.stub stripe, 'tokenize'
          .returns Promise.resolve id: 'a_token'

      it 'submits the form to the server when submitted/clicked', ->
        @view.$('input[data-stripe="number"]')
          .val '666666666666666666'

        @view.$('button').click()

        @view.__submit__.then =>
          stripe.tokenize.args[0][0].number
            .should.equal '666666666666666666'

          Backbone.sync.called
            .should.be.true()

          Backbone.sync.args[0][0]
            .should.equal 'create'

          Backbone.sync.args[0][1].toJSON()
            .should.eql
              token: 'a_token'
              provider: 'stripe'

    describe 'error state', ->
      beforeEach ->
        sinon.stub stripe, 'tokenize'
          .returns Promise.reject 'Stripe error string'

      it 'renders any errors', ->
        @view.$('button').click()

        @view.__submit__.then =>
          @view.$('.js-form-errors').text()
            .should.equal 'Stripe error string'
