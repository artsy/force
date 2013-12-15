{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'Artist routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'foo' } }
    @res = { render: sinon.stub(), locals: { sd: {} } }

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
