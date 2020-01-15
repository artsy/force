{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
moment = require 'moment'
PartnerFeaturedCities = require '../../../collections/partner_featured_cities'

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
      routes.__set__ 'ENABLE_WEB_CRAWLING', false

    it 'renders a noindex when ENABLE_WEB_CRAWLING is false', ->
      routes.__set__ 'ENABLE_WEB_CRAWLING', false
      routes.robots null, @res
      @res.send.args[0][0]
        .should.equal  'User-agent: *\nDisallow: /'

    describe 'when ENABLE_WEB_CRAWLING is true', ->
      beforeEach ->
        routes.__set__ ENABLE_WEB_CRAWLING: true, APP_URL: 'https://www.artsy.net'
        routes.robots null, @res
      it 'renders robots.txt', ->
        @res.send.args[0][0]
          .should.eql """
User-agent: *
Noindex: ?sort=
Noindex: ?dimension_range=
Disallow: /*?dns_source=
Disallow: /*?microsite=
Disallow: /*?from-show-guide=
Disallow: /search
Sitemap: https://www.artsy.net/sitemap-articles.xml
Sitemap: https://www.artsy.net/sitemap-artists.xml
Sitemap: https://www.artsy.net/sitemap-artist-images.xml
Sitemap: https://www.artsy.net/sitemap-artworks.xml
Sitemap: https://www.artsy.net/sitemap-cities.xml
Sitemap: https://www.artsy.net/sitemap-collect.xml
Sitemap: https://www.artsy.net/sitemap-fairs.xml
Sitemap: https://www.artsy.net/sitemap-features.xml
Sitemap: https://www.artsy.net/sitemap-genes.xml
Sitemap: https://www.artsy.net/sitemap-images.xml
Sitemap: https://www.artsy.net/sitemap-misc.xml
Sitemap: https://www.artsy.net/sitemap-news.xml
Sitemap: https://www.artsy.net/sitemap-partners.xml
Sitemap: https://www.artsy.net/sitemap-shows.xml
Sitemap: https://www.artsy.net/sitemap-tags.xml
Sitemap: https://www.artsy.net/sitemap-videos.xml

"""

      it 'includes a CR/LF at the end of robots.txt', ->
        @res.send.args[0][0].slice(-1).should.eql('\n')

  describe '#news', ->
    it 'displays the sitemap for articles that are < 2 days old', ->
      today = new Date()
      oneDayAgo = new Date()
      twoDaysAgo = new Date()

      oneDayAgo.setDate(today.getDate() - 1)
      twoDaysAgo.setDate(today.getDate() - 2)

      routes.news(@req, @res)
      Backbone.sync.args[0][2].success {
        total: 16088,
        count: 12,
        results: [
          fabricate('article', { layout: 'standard', published_at: today.toISOString() })
          fabricate('article', { layout: 'news', published_at: oneDayAgo.toISOString() })
          fabricate('article', { layout: 'classic', published_at: oneDayAgo.toISOString() })
          fabricate('article', { published_at: twoDaysAgo.toISOString() })
        ]
      }

      @res.render.args[0][0].should.equal('news')
      @res.render.args[0][1].articles.length.should.equal(2)

    it 'fetches with correct news data', ->
      routes.news(@req, @res)
      Backbone.sync.args[0][2].data.published.should.be.true()
      Backbone.sync.args[0][2].data.sort.should.equal '-published_at'
      Backbone.sync.args[0][2].data.exclude_google_news.should.be.false()
      Backbone.sync.args[0][2].data.limit.should.equal 100

  describe 'cinder sitemaps', ->
    it 'proxies sitemaps to s3', ->
      @req =
        headers: {}
      proxy = { web: sinon.stub() }
      routes.__set__ 'sitemapProxy', proxy
      routes.__set__ 'SITEMAP_BASE_URL', 'http://artsy-sitemaps.s3-website-us-east-1.amazonaws.com'
      @proxy = routes.__get__ 'sitemapProxy'
      routes.sitemaps @req, @res
      @proxy.web.args[0][0].headers['host'].should.equal 'artsy-sitemaps.s3-website-us-east-1.amazonaws.com'

  describe '#misc', ->
    it 'renders the misc template', ->
      routes.misc(@req, @res)
      @res.render.args[0][0].should.equal 'misc'
