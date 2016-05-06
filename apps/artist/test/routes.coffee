_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
Q = require 'bluebird-q'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user.coffee'
Artist = require '../../../models/artist.coffee'
routes = rewire '../routes'
sections = require '../sections'
artistJSON = require './fixtures'
helpers = require '../view_helpers'

describe 'Artist routes', ->
  beforeEach ->
    routes.__set__ 'metaphysics', @metaphysics = sinon.stub()
    @metaphysics.returns Q.resolve artist: artistJSON

    @req = params: { id: 'foo' }, get: (->), query: {}
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      send: sinon.stub()
      type: sinon.stub()
      locals: sd: APP_URL: 'http://localhost:5000', CURRENT_PATH: '/artist/jeff-koons-1'

  describe '#index', ->
    it 'renders the artist template', (done) ->
      routes.index @req, @res
      _.defer => _.defer =>
        @res.render.args[0][0].should.equal 'index'
        @res.render.args[0][1].artist.id.should.equal 'jeff-koons-1'
        @res.render.args[0][1].artist.name.should.equal 'Jeff Koons'
        done()

    it 'bootstraps the artist', (done) ->
      routes.index @req, @res
      _.defer => _.defer =>
        @res.locals.sd.ARTIST.should.equal artistJSON
        done()

    it 'redirects to canonical url', (done) ->
      @res.locals.sd.CURRENT_PATH = '/artist/bar'
      routes.index @req, @res
      _.defer => _.defer =>
        @res.redirect.args[0][0].should.equal '/artist/jeff-koons-1'
        done()

  describe '#follow', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'

    afterEach ->
      Backbone.sync.restore()

    it 'redirect to artist page without user', ->
      routes.follow @req, @res
      @res.redirect.args[0][0].should.equal '/artist/foo'

    it 'follows an artist and redirects to the artist page', ->
      @res.redirect = sinon.stub()
      @req.user = new CurrentUser fabricate 'user'
      routes.follow @req, @res
      Backbone.sync.args[0][1].url().should.containEql '/api/v1/me/follow/artist'
      Backbone.sync.args[0][1].get('artist_id').should.equal 'foo'
      Backbone.sync.args[0][2].success()
      @res.redirect.args[0][0].should.equal '/artist/foo'
