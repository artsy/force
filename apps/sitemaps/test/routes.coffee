{ fabricate } = require 'antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
moment = require 'moment'

describe 'Sitemaps', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = {}
    @res =
      render: sinon.stub()
      set: sinon.stub()
      send: sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#robots', ->
    beforeEach ->
      @res = set: sinon.stub(), send: sinon.stub()

    afterEach ->
      routes.__set__ 'NODE_ENV', 'test'

    it 'renders a noindex in anything but production', ->
      routes.__set__ 'NODE_ENV', 'staging'
      routes.robots null, @res
      @res.send.args[0][0]
        .should.equal  'User-agent: *\nNoindex: /'

    it 'renders the normal robots with sitemap in production', ->
      routes.__set__ NODE_ENV: 'production', APP_URL: 'https://www.artsy.net'
      routes.robots null, @res
      @res.send.args[0][0]
        .should.containEql  'User-agent: *\nNoindex: ?sort=\nNoindex: ?dimension_range=\nDisallow: ?dns_source=\nDisallow: ?microsite=\nDisallow: ?from-show-guide=\nSitemap: https://www.artsy.net/sitemap.xml\nSitemap: https://www.artsy.net/images_sitemap.xml'

  describe '#news_sitemap', ->

    it 'displays the sitemap for articles < 2 days old', ->
      routes.articles(@req, @res)
      Backbone.sync.args[0][2].success {
        total: 16088,
        count: 12,
        results: [
          fabricate('article', { published_at: new Date().toISOString() })
          fabricate('article', { published_at: '2015-01-21T22:02:03.808Z' })
        ]

      }
      @res.render.args[0][0].should.equal('news_sitemap')
      @res.render.args[0][1].articles.length.should.equal(1)

    it 'only displays articles from Artsy Editorial', ->
      routes.__set__ 'ARTSY_EDITORIAL_CHANNEL', '123'
      routes.articles(@req, @res)
      Backbone.sync.args[0][2].data.channel_id.should.equal '123'

  describe '#artworks', ->

    it 'displays the correct artwork URLs in the sitemap', ->
      routes.__set__ 'request', get: -> query: -> end: (cb) ->
        cb(null, { body: results: [fabricate 'artwork', { id: 'foo'}] })
      @req =
        params:
          date: '2012-01-01'
          page: 3
      routes.artworksPage('artworks')(@req, @res)
      @res.render.args[0][0].should.equal('artworks')
      @res.render.args[0][1].models[0].id.should.equal('foo')

  describe '#bingNew', ->

    it 'only displays artworks published in the past week', ->
      routes.__set__ 'request', get: -> query: (query) ->
        moment(query.published_at_since).isAfter(moment().subtract(8, 'days')).should.be.true()
        end: (cb) ->
          cb(null, { body: results: [fabricate 'artwork', { id: 'foo', title: 'bar' }] })
      routes.bingNew(@req, @res)
      @res.send.args[0][0][0].name.should.equal('bar')

  describe '#video', ->

    it 'only displays articles that are featured AND has_video', ->
      routes.video(@req, @res)
      Backbone.sync.args[0][2].data.featured.should.be.true()
      Backbone.sync.args[0][2].data.has_video.should.be.true()
