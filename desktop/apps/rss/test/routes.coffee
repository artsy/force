{ fabricate } = require 'antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
sd = require('sharify').data
Q = require 'bluebird-q'

describe 'RSS', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    routes.__set__ 'sd', { ARTSY_EDITORIAL_CHANNEL: 'foo' }
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

    it 'only displays articles that are featured', ->
      routes.news(@req, @res)
      Backbone.sync.args[0][2].data.featured.should.be.true()

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

    it 'only displays articles that are featured', ->
      routes.news(@req, @res)
      Backbone.sync.args[0][2].data.featured.should.be.true()

  describe '#partnerUpdates', ->

    beforeEach ->
      @section = {id: '55356a9deca560a0137aa4b7'}
      @articles = {
        total: 16088,
        count: 2,
        results: [
          fabricate('article', { id: 1, published_at: new Date().toISOString() })
          fabricate('article', { id: 2, published_at: new Date().toISOString() })
        ]
      }

      Backbone.sync
        .onCall 0
        .returns Q.resolve()
        .yieldsTo 'success', @articles

    it 'renders articles', ->
      routes.partnerUpdates @req, @res
      @res.render.args[0][0].should.equal 'partner_updates'
      @res.render.args[0][1].articles.should.have.lengthOf 2
