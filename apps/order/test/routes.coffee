_         = require 'underscore'
sinon     = require 'sinon'
Backbone  = require 'backbone'
routes    = require '../routes'
CurrentUser = require '../../../models/current_user'
{ fabricate } = require 'antigravity'
{ APP_URL } = require('../../../config')

describe 'Order routes', ->
  beforeEach ->
    @req = { params: {}, user: new CurrentUser fabricate 'user' }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    describe 'with a pending order', ->

      beforeEach ->
        @order = fabricate 'order'
        routes.index @req, @res
        Backbone.sync.args[0][2].success(@order)

      it 'renders the order page', ->
        @res.render.args[0][0].should.equal 'template'

      it 'passes the order to the template', ->
        @res.render.args[0][1]['order'].toJSON().id.should.equal @order.id
        @res.render.args[0][1]['order'].toJSON().user.should.equal @order.user

    describe 'without a pending order', ->

      it 'redirects to the home page', ->
        routes.index @req, @res
        Backbone.sync.args[0][2].error()
        @res.redirect.args[0][0].should.equal APP_URL