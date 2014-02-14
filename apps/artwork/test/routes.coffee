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
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'bootstraps the artwork', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar'
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar-artist'
      @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
      @res.locals.sd.ARTIST.id.should.equal 'andy-foobar-artist'
      @res.render.args[0][0].should.equal 'index'

    it 'works without an artist', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar', artist: null
      @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
      @res.render.args[0][0].should.equal 'index'
