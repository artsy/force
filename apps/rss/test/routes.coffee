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

    it 'displays the rss feed for news < 2 days old', ->
      routes.news(@req, @res)
      Backbone.sync.args[0][2].success {
        total: 16088,
        count: 12,
        results: [
          fabricate('article', { published_at: new Date().toISOString() })
          fabricate('article', { published_at: '2015-01-21T22:02:03.808Z' })
        ]

      }
      @res.render.args[0][0].should.equal('news')
      @res.render.args[0][1].articles.length.should.equal(1)

    it 'only displays articles from Artsy Editorial', ->
      routes.news(@req, @res)
      Backbone.sync.args[0][2].data.author_id.should.equal('503f86e462d56000020002cc')
