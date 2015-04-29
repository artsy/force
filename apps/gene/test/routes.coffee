{ fabricate, fabricate2 } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'

describe 'Gene routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req =
      params:
        id: 'foo'
      query:
        sort: '-published_at'
      originalUrl: 'http://localhost:5000/gene/gene'
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd:
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/artwork/andy-foobar'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    it 'bootstraps the gene', (done)->
      routes.index @req, @res
      _.first(Backbone.sync.args)[2].success fabricate 'gene', id: 'gene'
      _.last(Backbone.sync.args)[2].success fabricate2 'filter_artworks'

      _.defer =>
        @res.locals.sd.GENE.id.should.equal 'gene'
        @res.render.args[0][0].should.equal 'index'
        done()
