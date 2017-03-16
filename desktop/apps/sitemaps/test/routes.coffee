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
          .should.containEql  'User-agent: *\nNoindex: ?sort=\nNoindex: ?dimension_range=\nDisallow: ?dns_source=\nDisallow: ?microsite=\nDisallow: ?from-show-guide=\nSitemap: https://www.artsy.net/sitemap.xml\nSitemap: https://www.artsy.net/images_sitemap.xml'

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

  describe '#imagesIndex', ->

    it 'displays the correct image sitemap URLs for each bucket', ->
      routes.__set__ 'request', get: -> query: -> end: (cb) ->
        cb(null, { body: count: 400000 })
      routes.imagesIndex(@req, @res)
      @res.render.args[0][1].artworkBuckets[0].startDate.should.equal '2010-09-01'
      @res.render.args[0][1].artworkBuckets[0].pages.should.equal 80
      @res.render.args[0][1].artworkBuckets[1].startDate.should.equal '2010-10-01'
      @res.render.args[0][1].artworkBuckets[1].pages.should.equal 80

  describe '#index', ->

    it 'renders index with data', ->
      routes.__set__ 'async', parallel: sinon.stub().yields null, [[{ startDate: '2010-09-01', pages: 80 }], 5, 10]
      routes.index(@req, @res)
      @res.render.args[0][1].articlePages.should.equal 5
      @res.render.args[0][1].allPages.should.equal 10
      @res.render.args[0][1].artworkBuckets[0].startDate.should.equal '2010-09-01'
      @res.render.args[0][1].artworkBuckets[0].pages.should.equal 80
      @res.render.args[0][1].resources.length.should.equal 6

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

  describe '#artworksPage', ->

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

  describe '#articlesPage', ->

    it 'fetches articles and displays slugs', ->
      articles = [{slug: 'artsy-editorial-slug-1'}, {slug: 'artsy-editorial-slug-2'}]
      request = get: -> query: -> end: (cb) ->
        cb null, { body: results: articles}
      routes.__set__ 'request', request
      req =
        params:
          page: 1
      routes.articlesPage(req, @res)
      @res.render.args[0][1].slugs[0].should.equal 'artsy-editorial-slug-1'
      @res.render.args[0][1].slugs[1].should.equal 'artsy-editorial-slug-2'

  describe '#resourcePage', ->

    it 'fetches and displays a resource page', ->
      routes.__set__ 'request', get: -> set: -> query: -> end: (cb) ->
        cb null, { body: [{ id: 'gene-1' }, {id: 'gene-2'}] }
      req =
        params:
          page: 1
          resource: 'genes'
      routes.resourcePage req, @res
      @res.render.args[0][1].models[0].id.should.equal 'gene-1'
      @res.render.args[0][1].models[1].id.should.equal 'gene-2'

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