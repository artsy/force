_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
Q = require 'bluebird-q'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
routes = rewire '../routes'
artworkJSON = require './artwork_json'

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

  describe 'with a work that is not purchasable', ->
    beforeEach ->
      @metaphysics.returns Q.resolve artwork: _.extend , artworkJSON, is_purchasable: false

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
              purchase: undefined
              fair: undefined
            }

      it 'without a user', ->
        routes.index @req, @res
          .then =>
            @res.render.args[0][0].should.eql 'index'
            @res.render.args[0][1].should.eql {
              artwork: artworkJSON,
              user: undefined
              purchase: undefined
              fair: undefined
            }

      it 'passes fair', ->
        fair =
          id: 'foo-fest'
          name: 'Foo Fest 2016'
        @metaphysics.returns Q.resolve artwork: _.extend { fair }, artworkJSON

        routes.index @req, @res
          .then =>
            @res.render.args[0][0].should.eql 'index'
            @res.render.args[0][1].should.containEql {
              artwork: _.extend { fair }, artworkJSON
              user: undefined
              purchase: undefined
            }
            @res.render.args[0][1].fair.attributes.should.containEql
              id: 'foo-fest'
              name: 'Foo Fest 2016'

      describe 'with a cookie', ->
        it 'does not pass purchase if artwork ids do not match', ->
          @req.cookies['purchase-inquiry'] = '{"artwork_id":"foo-bar"}'
          routes.index @req, @res
            .then =>
              @res.render.args[0][0].should.eql 'index'
              @res.render.args[0][1].should.eql {
                artwork: artworkJSON,
                user: undefined
                purchase: undefined
                fair: undefined
              }

        it 'passes purchase if artwork ids match', ->
          @req.cookies['purchase-inquiry'] = '{"artwork_id":"foo-bar-id"}'
          routes.index @req, @res
            .then =>
              @res.render.args[0][0].should.eql 'index'
              @res.render.args[0][1].should.eql {
                artwork: artworkJSON,
                user: undefined
                purchase: { artwork_id: 'foo-bar-id' }
                fair: undefined
              }

    it 'thankYou', ->
      routes.thankYou @req, @res
        .then =>
          @res.render.args[0][0].should.eql 'success'
          @res.render.args[0][1].should.eql {
            artwork: artworkJSON
          }
