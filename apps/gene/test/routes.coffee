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
    @req = { params: { id: 'foo' }, query: { sort: '-published_at' }, originalUrl: 'http://localhost:5000/gene/gene' }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { APP_URL: 'http://localhost:5000', CURRENT_PATH: '/artwork/andy-foobar' } } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    it 'bootstraps the gene', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'gene', id: 'gene'
      @res.locals.sd.GENE.id.should.equal 'gene'
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].includeMetaFragment.should.be.ok

    it 'does not include meta fragment on /artworks urls', ->
      @req.originalUrl = 'http://localhost:5000/gene/gene/artworks'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'gene', id: 'gene'
      @res.locals.sd.GENE.id.should.equal 'gene'
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].includeMetaFragment.should.not.be.ok
