benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
CreditCardView = benv.requireWithJadeify require.resolve('../view.coffee'), ['template']
CreditCardView.__set__ 'stripe',
  initialize: sinon.stub()

describe 'CreditCardView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @user = new CurrentUser id: 'foobar'
    @view = new CreditCardView user: @user

  describe '#render', ->
    it 'renders the template', ->
      @view.render().$el.html()
        .should.containEql 'Add Credit Card'
