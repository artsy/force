{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'
Artist = require '../../../models/artist.coffee'

describe 'Artist routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foo' }, query: { sort: '-published_at' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000', CURRENT_PATH: '/artist/andy-foobar'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the artist template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar'
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].artist.get('id').should.equal 'andy-foobar'

    it 'bootstraps the artist', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar'
      @res.locals.sd.ARTIST.id.should.equal 'andy-foobar'

    it 'makes the right API call using the passed in sort', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar'
      @res.locals.sd.sortBy.should.equal '-published_at'

    it 'sets the default sort if not a valid sort', ->
      @req.query.sort = 'bogus'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar'
      @res.locals.sd.sortBy.should.equal ''

    it 'redirects to canonical url', ->
      @res.locals.sd.CURRENT_PATH = '/artist/bar'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar'
      @res.redirect.args[0][0].should.equal '/artist/andy-foobar'

  describe '#follow', ->

    it 'redirect to artist page without user', ->
      routes.follow @req, @res
      @res.redirect.args[0][0].should.equal '/artist/foo'

    it 'follows an artist and redirects to the artist page', ->
      @res.redirect = sinon.stub()
      @req.user = new CurrentUser fabricate 'user'
      routes.follow @req, @res
      Backbone.sync.args[0][1].url().should.include '/api/v1/me/follow/artist'
      Backbone.sync.args[0][1].get('artist_id').should.equal 'foo'
      Backbone.sync.args[0][2].success()
      @res.redirect.args[0][0].should.equal '/artist/foo'
