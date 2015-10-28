_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user.coffee'
Artist = require '../../../models/artist.coffee'
routes = rewire '../routes'
sections = require '../sections'

describe 'Artist routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = params: { id: 'foo' }, get: (->), query: {}
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      send: sinon.stub()
      type: sinon.stub()
      locals: sd: APP_URL: 'http://localhost:5000', CURRENT_PATH: '/artist/andy-foobar'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    it 'renders the artist template', (done) ->
      routes.index @req, @res
      Backbone.sync.args[0][2].success fabricate 'artist', id: 'andy-foobar'
      Backbone.sync.args[1][2].success()
      _.each Backbone.sync.args[2..-1], (args) -> args[2].success()
      _.last(Backbone.sync.args)[2].success()
      _.defer => _.defer =>
        @res.render.args[0][0].should.equal 'index'
        @res.render.args[0][1].artist.get('id').should.equal 'andy-foobar'
        done()

    it 'bootstraps the artist', (done) ->
      routes.index @req, @res
      Backbone.sync.args[0][2].success fabricate 'artist', id: 'andy-foobar'
      Backbone.sync.args[1][2].success()
      _.each Backbone.sync.args[2..-1], (args) -> args[2].success()
      _.last(Backbone.sync.args)[2].success()
      _.defer => _.defer =>
        @res.locals.sd.ARTIST.id.should.equal 'andy-foobar'
        done()

    it 'redirects to canonical url', (done) ->
      @res.locals.sd.CURRENT_PATH = '/artist/bar'
      routes.index @req, @res
      Backbone.sync.args[0][2].success fabricate 'artist', id: 'andy-foobar'
      Backbone.sync.args[1][2].success()
      _.each Backbone.sync.args[2..-1], (args) -> args[2].success()
      _.last(Backbone.sync.args)[2].success()
      _.defer => _.defer =>
        @res.redirect.args[0][0].should.equal '/artist/andy-foobar'
        done()

    it 'sets the mode if either columns or table', (done) ->
      @res.locals.sd.CURRENT_PATH = '/artist/bar'
      routes.index @req, @res
      Backbone.sync.args[0][2].success fabricate 'artist', id: 'andy-foobar'
      Backbone.sync.args[1][2].success()
      _.each Backbone.sync.args[2..-1], (args) -> args[2].success()
      _.last(Backbone.sync.args)[2].success()
      _.defer => _.defer =>
        @res.redirect.args[0][0].should.equal '/artist/andy-foobar'
        done()

    describe 'with a referrer', ->
      beforeEach ->
        @reqRestore = @req
        @req.get = -> 'https://www.google.com/webhp#q=foobar'

      afterEach ->
        @req = @reqRestore

      it 'parse the medium and passes it to Sharify', (done) ->
        routes.index @req, @res
        Backbone.sync.args[0][2].success fabricate 'artist', id: 'andy-foobar'
        Backbone.sync.args[1][2].success()
        _.each Backbone.sync.args[2..-1], (args) -> args[2].success()
        _.last(Backbone.sync.args)[2].success()
        _.defer => _.defer =>
          @res.locals.sd.MEDIUM.should.equal 'search'
          done()

  describe '#follow', ->
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
