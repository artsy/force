_ = require 'underscore'
Articles = require '../../collections/articles'
request = require 'superagent'
moment = require 'moment'
async = require 'async'
PartnerFeaturedCities = require '../../collections/partner_featured_cities'
{ NODE_ENV, API_URL, POSITRON_URL, APP_URL, ARTSY_EDITORIAL_CHANNEL, SITEMAP_BASE_URL } = require('sharify').data
artsyXapp = require 'artsy-xapp'
PAGE_SIZE = 100
{ parse } = require 'url'
httpProxy = require 'http-proxy'
sitemapProxy = httpProxy.createProxyServer(target: SITEMAP_BASE_URL)

@articles = (req, res, next) ->
  new Articles().fetch
    data:
      featured: true
      published: true
      sort: '-published_at'
      exclude_google_news: false
      limit: PAGE_SIZE
    error: res.backboneError
    success: (articles) ->
      recentArticles = articles.filter (article) ->
        moment(article.get 'published_at').isAfter(moment().subtract(2, 'days'))
      res.set 'Content-Type', 'text/xml'
      res.render('news_sitemap', { pretty: true, articles: recentArticles })

@index = (req, res, next) ->
  resources = ['features', 'shows', 'fairs']
  async.parallel [
    # Get articles counts
    (cb) ->
      request
        .get(POSITRON_URL + '/api/articles')
        .query(published: true, limit: 1, count: true)
        .end (err, sres) ->
          return cb(err) if err
          totalCount = Math.ceil sres.body.count / PAGE_SIZE
          cb null, totalCount
    # Get the rest of the resource counts
    (cb) ->
      async.map resources, ((resource, cb) ->
        request
          .head(API_URL + '/api/v1/' + resource)
          .set('X-XAPP-TOKEN': artsyXapp.token)
          .query(total_count: 1)
          .end(cb)
      ), (err, results) ->
        return cb(err) if err
        allPages = results.map (sres) -> Math.ceil sres.headers['x-total-count'] / PAGE_SIZE
        cb null, allPages
  ], (err, [articlePages, allPages]) ->
    return next(err) if err
    res.set 'Content-Type', 'text/xml'
    res.render('index', {
      pretty: true
      articlePages: articlePages
      allPages: allPages
      resources: resources
    })

@misc = (req, res, next) ->
  res.set 'Content-Type', 'text/xml'
  res.render('misc', pretty: true)

@cities = (req, res, next) ->
  partnerFeaturedCities = new PartnerFeaturedCities()
  partnerFeaturedCities.fetch
    success: ->
      res.set 'Content-Type', 'text/xml'
      res.render 'cities', pretty: true, citySlugs: partnerFeaturedCities.pluck('slug')

@articlesPage = (req, res, next) ->
  request
    .get(POSITRON_URL + '/api/articles')
    .query(offset: req.params.page * PAGE_SIZE, limit: PAGE_SIZE, published: true)
    .end (err, sres) ->
      return next err if err
      slugs = _.pluck(sres.body.results, 'slug')
      res.set 'Content-Type', 'text/xml'
      res.render('articles', pretty: true, slugs: slugs)

@resourcePage = (req, res, next) ->
  request
    .get(API_URL + '/api/v1/' + req.params.resource)
    .set('X-XAPP-TOKEN': artsyXapp.token)
    .query(page: req.params.page, size: PAGE_SIZE)
    .end (err, sres) ->
      return next err if err
      res.set 'Content-Type', 'text/xml'
      res.render(req.params.resource, pretty: true, models: sres.body)

# sitemaps for artworks and images are generated in Spark by Cinder and written to the artsy-sitemaps s3 bucket
# see https://github.com/artsy/cinder/blob/master/doc/sitemaps.md for more information
@sitemaps = (req, res, next) ->
  req.headers['host'] = parse(SITEMAP_BASE_URL).host
  sitemapProxy.web req, res

@video = (req, res) ->
  new Articles().fetch
    data:
      featured: true
      published: true
      sort: '-published_at'
      has_video: true
      exclude_google_news: false
    error: res.backboneError
    success: (articles) ->
      res.set 'Content-Type', 'text/xml'
      res.render('video', { pretty: true, articles: articles, moment: moment })

@robots = (req, res) ->
  res.set 'Content-Type', 'text/plain'
  robotsText = """
    User-agent: *
    Noindex: ?sort=
    Noindex: ?dimension_range=
    Disallow: ?dns_source=
    Disallow: ?microsite=
    Disallow: ?from-show-guide=
    Sitemap: #{APP_URL}/sitemap.xml
    Sitemap: #{APP_URL}/sitemap-artists.xml
    Sitemap: #{APP_URL}/sitemap-genes.xml
    Sitemap: #{APP_URL}/sitemap-artworks.xml
    Sitemap: #{APP_URL}/sitemap-images.xml
    Sitemap: #{APP_URL}/sitemap-partners.xml

  """
  res.send switch NODE_ENV
    when 'production'
      robotsText
    else
      "User-agent: *\nNoindex: /"
