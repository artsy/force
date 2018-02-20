sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
acquire = rewire '../acquire'

describe 'acquire', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @__redirectTo__ = acquire.__get__ 'redirectTo'
    acquire.__set__ 'redirectTo', @redirectTo = sinon.stub()

  afterEach ->
    Backbone.sync.restore()
    acquire.__set__ 'redirectTo', @__redirectTo__

  it 'saves a pending order', ->
    acquire 'foo-artwork'
      .then ->
        Backbone.sync.args[0][1].url
          .should.containEql '/api/v1/me/order/pending/items'

        Backbone.sync.args[0][1].attributes
          .should.eql
            artwork_id: 'foo-artwork'
            edition_set_id: undefined
            quantity: null
            replace_order: true
            session_id: undefined

  it 'optionally accepts an edition_set_id', ->
    acquire 'foo-artwork', 'foo-artwork-edition-set-id'
      .then ->
        Backbone.sync.args[0][1].attributes
          .should.eql
            artwork_id: 'foo-artwork'
            edition_set_id: 'foo-artwork-edition-set-id'
            quantity: null
            replace_order: true
            session_id: undefined

  it 'redirects to the checkout page upon success', ->
    Backbone.sync
      .yieldsTo 'success', id: 'my-order-id', token: 'my-order-token'

    acquire 'foo-artwork'
      .then =>
        @redirectTo.args[0][0]
          .should.equal '/order/my-order-id/resume?token=my-order-token'
