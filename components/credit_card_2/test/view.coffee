benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
CreditCardView = benv.requireWithJadeify require.resolve('../view.coffee'), ['template']
stripe = CreditCardView.__get__ 'stripe'

describe 'CreditCardView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub stripe, 'initialize'

    @user = new CurrentUser id: 'foobar'
    @view = new CreditCardView collection: @user.related().creditCards

  afterEach ->
    stripe.initialize.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.render().$el.html()
        .should.containEql 'Add Credit Card'

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

      it 'triggers a `done` event', (done) ->
        @view.once 'done', (card) ->
          card.toJSON()
            .should.eql
              token: 'a_token'
              provider: 'stripe'

          done()

        @view.$('button').click()

    describe 'error state', ->
      beforeEach ->
        sinon.stub stripe, 'tokenize'
          .returns Promise.reject 'Stripe error string'

      it 'renders any errors', ->
        @view.$('button').click()

        @view.__submit__.then =>
          @view.$('.js-form-errors').text()
            .should.equal 'Stripe error string'
