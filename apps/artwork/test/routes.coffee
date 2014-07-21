{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'
Artwork = require '../../../models/artwork.coffee'

describe 'Artwork routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foo' }, query: { sort: '-published_at' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { APP_URL: 'http://localhost:5000', CURRENT_PATH: '/artwork/andy-foobar' } } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    it 'bootstraps the artwork', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar'
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar-artist'
      @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
      @res.locals.sd.ARTIST.id.should.equal 'andy-foobar-artist'
      @res.render.args[0][0].should.equal 'index'

    it 'works without an artist', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar', artist: null
      @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
      @res.render.args[0][0].should.equal 'index'

    it 'works with client side routes', ->
      @res.locals.sd.CURRENT_PATH = '/artwork/andy-foobar/inquire'
      @req.params.tab = 'inquire'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar'
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar-artist'
      @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
      @res.locals.sd.ARTIST.id.should.equal 'andy-foobar-artist'
      @res.render.args[0][0].should.equal 'index'

    it 'redirects to the correct artwork url', ->
      @res.locals.sd.CURRENT_PATH = '/artwork/andy-foobar-wrong'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar'
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar-artist'
      @res.redirect.args[0][0].should.equal '/artwork/andy-foobar'

    it 'redirects to the correct artwork page for client side routes fetched with a changed slug', ->
      @res.locals.sd.CURRENT_PATH = '/artwork/andy-foobar-wrong/inquire'
      @req.params.tab = 'inquire'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar'
      _.last(Backbone.sync.args)[2].success fabricate 'artist', id: 'andy-foobar-artist'
      @res.redirect.args[0][0].should.equal '/artwork/andy-foobar'

  describe '#save', ->
    it 'saves the artwork', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.save @req, @res
      _.last(Backbone.sync.args)[0].should.equal 'create'
      _.last(Backbone.sync.args)[1].url.should.include "/api/v1/collection/saved-artwork/artwork/#{@req.params.id}?user_id=#{@req.user.id}"
