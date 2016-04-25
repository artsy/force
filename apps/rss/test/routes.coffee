{ fabricate } = require 'antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
sd = require('sharify').data

describe 'RSS', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    routes.__set__ 'sd', { ARTSY_EDITORIAL_ID: 'foo' }
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
      Backbone.sync.args[0][2].data.author_id.should.equal('foo')

  describe '#instantArticles', ->

    it 'renders the rss feed for instant articles', ->
      routes.instantArticles(@req, @res)

      Backbone.sync.args[0][2].success {
        total: 16088,
        count: 2,
        results: [
          fabricate('article', { published_at: new Date().toISOString() })
          fabricate('article', { published_at: new Date().toISOString() })
        ]
      }

      @res.render.args[0][0].should.equal('instant_articles')
      @res.render.args[0][1].articles.length.should.equal(2)

    it 'only displays articles from Artsy Editorial', ->
      routes.news(@req, @res)
      Backbone.sync.args[0][2].data.author_id.should.equal('foo')
