_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
Q = require 'bluebird-q'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user.coffee'
routes = rewire '../routes'
artworkJSON = require './artwork_json.coffee'

describe 'Artist routes', ->
  beforeEach ->
    routes.__set__ 'metaphysics', @metaphysics = sinon.stub()
    @metaphysics.debug = sinon.stub()

    @req = params: { id: 'ioam-yumako-cosmo-oil-on-canvas-2' }, get: (->), query: {}
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      send: sinon.stub()
      type: sinon.stub()
      locals: sd:
        NODE_ENV: 'test'

  describe 'with a work that is not purchasable', ->
    beforeEach ->
      @metaphysics.returns Q.resolve artwork: _.extend , artworkJSON, is_purchasable: false

    it 'index', ->
      routes.index @req, @res
        .then =>
          @res.render.called.should.be.false()
          @res.redirect.args[0][0].should.eql '/artwork/ioam-yumako-cosmo-oil-on-canvas-2'

    it 'thankYou', ->
      routes.thankYou @req, @res
        .then =>
          @res.render.called.should.be.false()
          @res.redirect.args[0][0].should.eql '/artwork/ioam-yumako-cosmo-oil-on-canvas-2'


  describe 'with a work that is purchasable', ->
    beforeEach ->
      @metaphysics.returns Q.resolve artwork: artworkJSON

    describe 'index', ->
      it 'with a user', ->
        @req.user = { id: 'foo-bar' }
        routes.index @req, @res
          .then =>
            @res.render.args[0][0].should.eql 'index'
            @res.render.args[0][1].should.eql {
              artwork: artworkJSON,
              user: { id: 'foo-bar' }
            }

      it 'without a user', ->
        routes.index @req, @res
          .then =>
            @res.render.args[0][0].should.eql 'index'
            @res.render.args[0][1].should.eql {
              artwork: artworkJSON,
              user: undefined
            }

    it 'thankYou', ->
      routes.thankYou @req, @res
        .then =>
          @res.render.args[0][0].should.eql 'success'
          @res.render.args[0][1].should.eql {
            artwork: artworkJSON
          }

