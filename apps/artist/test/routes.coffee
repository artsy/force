{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'

describe 'Artist routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foo' }, query: { sort: '-published_at' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

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

  describe '#follow', ->

    it 'redirect to artist page without user', ->
      routes.follow @req, @res
      @res.redirect.args[0][0].should.equal '/artist/foo'

    it 'follows an artist and renders the artist template', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.follow @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar'
      Backbone.sync.args[1][1].url.should.include "/api/v1/me/follow/artist?artist_id=foo"
      _.last(Backbone.sync.args)[2].success()
      @res.locals.sd.ARTIST.id.should.equal 'andy-foobar'
