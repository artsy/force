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
    @req = params: { id: 'foo' }, query: {}
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
      _.defer =>
        @res.render.args[0][0].should.equal 'index'
        @res.render.args[0][1].artist.get('id').should.equal 'andy-foobar'
        done()

    it 'bootstraps the artist', (done) ->
      routes.index @req, @res
      Backbone.sync.args[0][2].success fabricate 'artist', id: 'andy-foobar'
      Backbone.sync.args[1][2].success()
      _.each Backbone.sync.args[2..-1], (args) -> args[2].success()
      _.defer =>
        @res.locals.sd.ARTIST.id.should.equal 'andy-foobar'
        done()

    it 'redirects to canonical url', (done) ->
      @res.locals.sd.CURRENT_PATH = '/artist/bar'
      routes.index @req, @res
      Backbone.sync.args[0][2].success fabricate 'artist', id: 'andy-foobar'
      Backbone.sync.args[1][2].success()
      _.each Backbone.sync.args[2..-1], (args) -> args[2].success()
      _.defer =>
        @res.redirect.args[0][0].should.equal '/artist/andy-foobar'
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

  describe '#data', ->
    beforeEach ->
      @response = require './fixtures/publications'
      @request = routes.__get__('request')
      sinon.stub(@request, 'get').returns(end: @endStub = sinon.stub())

    afterEach ->
      @request.get.restore()

    it 'fetches the data', ->
      @req = query: {}, params: id: 'sterling-ruby', section: 'publications'
      routes.data @req, @res
      @request.get.args[0][0].should.equal 'http://force-staging.s3.amazonaws.com/data/sterling-ruby/publications.json'
      @endStub.args[0][0](null, status: 200, body: [foo: 'bar'])
      @res.send.args[0][0].should.eql [foo: 'bar']

    it 'returns an empty array when it does not have anything available', ->
      @req = query: {}, params: id: 'damon-zucconi', section: 'publications'
      routes.data @req, @res
      @endStub.args[0][0](null, status: 404)
      @res.send.args[0][0].should.be.instanceOf Array
      @res.send.args[0][0].length.should.equal 0

    it 'accepts a kind filter query param', ->
      @req =
        query: kind: ['review']
        params: id: 'sterling-ruby', section: 'publications'
      routes.data @req, @res
      @endStub.args[0][0](null, status: 200, body: @response)
      _.uniq(_.pluck(@res.send.args[0][0], 'kind')).should.eql ['review']

    it 'accepts multiple kind filter query param', ->
      @req =
        query: kind: ['interview', 'review']
        params: id: 'sterling-ruby', section: 'publications'
      routes.data @req, @res
      @endStub.args[0][0](null, status: 200, body: @response)
      _.uniq(_.pluck(@res.send.args[0][0], 'kind')).should.eql ['interview', 'review']

    it 'accepts a merchandisable filter query param', ->
      @req =
        query: merchandisable: ['true']
        params: id: 'sterling-ruby', section: 'publications'
      routes.data @req, @res
      @endStub.args[0][0](null, status: 200, body: @response)
      _.uniq(_.pluck(@res.send.args[0][0], 'merchandisable')).should.eql [true]

    it 'accepts both filter query params', ->
      @req =
        query: merchandisable: ['true'], kind: ['catalogue']
        params: id: 'sterling-ruby', section: 'publications'
      routes.data @req, @res
      @endStub.args[0][0](null, status: 200, body: @response)
      _.uniq(_.pluck(@res.send.args[0][0], 'merchandisable')).should.eql [true]
      _.uniq(_.pluck(@res.send.args[0][0], 'kind')).should.eql ['catalogue']

    describe 'cached', ->
      beforeEach ->
        @cache = routes.__get__('cache')
        @ogGet = @cache.get
        @cache.get = (x, cb) =>
          cb(null, JSON.stringify(@response))

      afterEach ->
        @cache.get = @ogGet

      it 'is able to filter cached data', ->
        @req =
          query: merchandisable: ['true'], kind: ['catalogue']
          params: id: 'sterling-ruby', section: 'publications'
        routes.data @req, @res
        _.uniq(_.pluck(@res.send.args[0][0], 'merchandisable')).should.eql [true]
        _.uniq(_.pluck(@res.send.args[0][0], 'kind')).should.eql ['catalogue']
