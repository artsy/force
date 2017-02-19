_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'

describe 'Order routes', ->
  beforeEach ->
    @req = { params: {}, user: new CurrentUser fabricate 'user' }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'https://artsy.net' } } }
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#resume', ->

    describe 'logged out', ->

      beforeEach ->
        @req =
          user: undefined
          query:
            token: 'an-order-token'
          params:
            id: 'order-id'
        routes.resume @req, @res

      it 'redirects to the order page', ->
        @res.redirect.args[0][0].should.containEql '/order/order-id/resume?token=an-order-token&stop_microgravity_redirect=true'

    describe 'logged in', ->

      beforeEach ->
        @req.query = token: 'an-order-token'
        @req.params = id: 'order-id'

        routes.resume @req, @res

      it 'redirects to the order page', ->
        @res.redirect.args[0][0].should.containEql '/order/order-id/resume?token=an-order-token&stop_microgravity_redirect=true'
