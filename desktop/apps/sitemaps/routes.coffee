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

@news = (req, res, next) ->
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
      res.render('news', { pretty: true, articles: recentArticles })

@misc = (req, res, next) ->
  res.set 'Content-Type', 'text/xml'
  res.render('misc', pretty: true)

@cities = (req, res, next) ->
  partnerFeaturedCities = new PartnerFeaturedCities()
  partnerFeaturedCities.fetch
    success: ->
      res.set 'Content-Type', 'text/xml'
      res.render 'cities', pretty: true, citySlugs: partnerFeaturedCities.pluck('slug')

# sitemaps for artworks and images are generated in Spark by Cinder and written to the artsy-sitemaps s3 bucket
# see https://github.com/artsy/cinder/blob/master/doc/sitemaps.md for more information
@sitemaps = (req, res, next) ->
  req.headers['host'] = parse(SITEMAP_BASE_URL).host
  sitemapProxy.web req, res

@robots = (req, res) ->
  res.set 'Content-Type', 'text/plain'
  robotsText = """
    User-agent: *
    Noindex: ?sort=
    Noindex: ?dimension_range=
    Disallow: ?dns_source=
    Disallow: ?microsite=
    Disallow: ?from-show-guide=
    Sitemap: #{APP_URL}/sitemap-articles.xml
    Sitemap: #{APP_URL}/sitemap-artists.xml
    Sitemap: #{APP_URL}/sitemap-artist-images.xml
    Sitemap: #{APP_URL}/sitemap-artworks.xml
    Sitemap: #{APP_URL}/sitemap-cities.xml
    Sitemap: #{APP_URL}/sitemap-fairs.xml
    Sitemap: #{APP_URL}/sitemap-features.xml
    Sitemap: #{APP_URL}/sitemap-genes.xml
    Sitemap: #{APP_URL}/sitemap-images.xml
    Sitemap: #{APP_URL}/sitemap-misc.xml
    Sitemap: #{APP_URL}/sitemap-news.xml
    Sitemap: #{APP_URL}/sitemap-partners.xml
    Sitemap: #{APP_URL}/sitemap-shows.xml
    Sitemap: #{APP_URL}/sitemap-videos.xml

  """
  res.send switch NODE_ENV
    when 'production'
      robotsText
    else
      "User-agent: *\nNoindex: /"
