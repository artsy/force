{ fabricate } = require 'antigravity'
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
      routes.__set__ 'NODE_ENV', 'test'

    it 'renders a noindex in anything but production', ->
      routes.__set__ 'NODE_ENV', 'staging'
      routes.robots null, @res
      @res.send.args[0][0]
        .should.equal  'User-agent: *\nNoindex: /'

    describe 'production', ->
      beforeEach ->
        routes.__set__ NODE_ENV: 'production', APP_URL: 'https://www.artsy.net'
        routes.robots null, @res

      it 'renders the normal robots with sitemap in production', ->
        @res.send.args[0][0]
          .should.eql """
User-agent: *
Noindex: ?sort=
Noindex: ?dimension_range=
Disallow: ?dns_source=
Disallow: ?microsite=
Disallow: ?from-show-guide=
Sitemap: https://www.artsy.net/sitemap.xml
Sitemap: https://www.artsy.net/sitemap-articles.xml
Sitemap: https://www.artsy.net/sitemap-artists.xml
Sitemap: https://www.artsy.net/sitemap-genes.xml
Sitemap: https://www.artsy.net/sitemap-artworks.xml
Sitemap: https://www.artsy.net/sitemap-images.xml
Sitemap: https://www.artsy.net/sitemap-partners.xml
Sitemap: https://www.artsy.net/sitemap-shows.xml

"""

      it 'includes a CR/LF at the end of robots.txt', ->
        @res.send.args[0][0].slice(-1).should.eql('\n')

  describe '#articles', ->

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

    it 'fetches with correct news data', ->
      routes.articles(@req, @res)
      Backbone.sync.args[0][2].data.featured.should.be.true()
      Backbone.sync.args[0][2].data.published.should.be.true()
      Backbone.sync.args[0][2].data.sort.should.equal '-published_at'
      Backbone.sync.args[0][2].data.exclude_google_news.should.be.false()
      Backbone.sync.args[0][2].data.limit.should.equal 100

  describe '#artworks and #images', ->
    it 'proxies sitemaps to s3', ->
      @req =
        headers: {}
      proxy = { web: sinon.stub() }
      routes.__set__ 'sitemapProxy', proxy
      routes.__set__ 'SITEMAP_BASE_URL', 'http://artsy-sitemaps.s3-website-us-east-1.amazonaws.com'
      @proxy = routes.__get__ 'sitemapProxy'
      routes.sitemaps @req, @res
      @proxy.web.args[0][0].headers['host'].should.equal 'artsy-sitemaps.s3-website-us-east-1.amazonaws.com'

  describe '#index', ->

    it 'renders index with data', ->
      routes.__set__ 'async', parallel: sinon.stub().yields null, [10]
      routes.index(@req, @res)
      @res.render.args[0][1].allPages.should.equal 10
      @res.render.args[0][1].resources.length.should.equal 2

  describe '#misc', ->

    it 'renders the misc template', ->
      routes.misc(@req, @res)
      @res.render.args[0][0].should.equal 'misc'

  describe '#cities', ->

    it 'fetches and displays city slugs', ->
      routes.cities(@req, @res)
      Backbone.sync.args[0][2].success [{ slug: 'new-york-city' }, { slug: 'tokyo' }]
      @res.render.args[0][1].citySlugs.length.should.equal 2
      @res.render.args[0][1].citySlugs[0].should.containEql 'new-york-city'
      @res.render.args[0][1].citySlugs[1].should.containEql 'tokyo'

  describe '#resourcePage', ->

    it 'fetches and displays a resource page', ->
      routes.__set__ 'request', get: -> set: -> query: -> end: (cb) ->
        cb null, { body: [{ id: 'feature-1' }, {id: 'feature-2'}] }
      req =
        params:
          page: 1
          resource: 'features'
      routes.resourcePage req, @res
      @res.render.args[0][1].models[0].id.should.equal 'feature-1'
      @res.render.args[0][1].models[1].id.should.equal 'feature-2'

  describe '#video', ->

    it 'only displays articles that are featured AND has_video', ->
      routes.video(@req, @res)
      Backbone.sync.args[0][2].data.featured.should.be.true()
      Backbone.sync.args[0][2].data.has_video.should.be.true()
