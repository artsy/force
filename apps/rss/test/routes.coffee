{ fabricate } = require 'antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'RSS', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = {}
    @res =
      render: sinon.stub()
      set: sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#news', ->

    it 'renders the rss feed for news', ->
      routes.news(@req, @res)

      Backbone.sync.args[0][2].success {
        total: 16088,
        count: 2,
        results: [
          fabricate('article', { published_at: new Date().toISOString() })
          fabricate('article', { published_at: new Date().toISOString() })
        ]
      }

      @res.render.args[0][0].should.equal('news')
      @res.render.args[0][1].articles.length.should.equal(2)

    it 'only displays articles from Artsy Editorial', ->
      routes.news(@req, @res)
      Backbone.sync.args[0][2].data.author_id.should.equal('503f86e462d56000020002cc')
