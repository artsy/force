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

    @req =
      params: { id: 'foo-bar-id' }
      get: (->)
      query: {}
      cookies: {}
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      send: sinon.stub()
      type: sinon.stub()
      locals: sd: {}

  describe 'with any artwork', ->
    beforeEach ->
      @metaphysics.returns Q.resolve artwork: artworkJSON

    it 'index', ->
      routes.index @req, @res
        .then =>
          @res.render.called.should.be.false()
          @res.redirect.args[0][0].should.eql '/artwork/foo-bar-id'

    it 'thankYou', ->
      routes.thankYou @req, @res
        .then =>
          @res.render.called.should.be.false()
          @res.redirect.args[0][0].should.eql '/artwork/foo-bar-id'
