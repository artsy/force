_ = require 'underscore'
Articles = require '../../collections/articles'
request = require 'superagent'
moment = require 'moment'
async = require 'async'
PartnerFeaturedCities = require '../../collections/partner_featured_cities'
{ API_URL, POSITRON_URL, APP_URL, ARTSY_EDITORIAL_CHANNEL, ENABLE_WEB_CRAWLING, SITEMAP_BASE_URL } = require('sharify').data
artsyXapp = require 'artsy-xapp'
PAGE_SIZE = 100
{ parse } = require 'url'
sd = require 'sharify'
httpProxy = require 'http-proxy'
sitemapProxy = httpProxy.createProxyServer(target: SITEMAP_BASE_URL)
getFullEditorialHref = require("@artsy/reaction/dist/Components/Publishing/Constants").getFullEditorialHref

@news = (req, res, next) ->
  new Articles().fetch
    data:
      channel_id: sd.ARTSY_EDITORIAL_CHANNEL
      published: true
      sort: '-published_at'
      exclude_google_news: false
      limit: PAGE_SIZE
    error: res.backboneError
    success: (articles) ->
      recentArticles = articles.filter (article) ->
        moment(article.get 'published_at').isAfter(moment().subtract(2, 'days')) && article.get("layout") != 'classic'
      res.set 'Content-Type', 'text/xml'
      res.render('news', { pretty: true, articles: recentArticles, getFullEditorialHref: getFullEditorialHref })

@misc = (req, res, next) ->
  res.set 'Content-Type', 'text/xml'
  res.render('misc', pretty: true)

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
    Disallow: /*?dns_source=
    Disallow: /*?microsite=
    Disallow: /*?from-show-guide=
    Disallow: /search
    Sitemap: #{APP_URL}/sitemap-articles.xml
    Sitemap: #{APP_URL}/sitemap-artists.xml
    Sitemap: #{APP_URL}/sitemap-artist-images.xml
    Sitemap: #{APP_URL}/sitemap-artworks.xml
    Sitemap: #{APP_URL}/sitemap-cities.xml
    Sitemap: #{APP_URL}/sitemap-collect.xml
    Sitemap: #{APP_URL}/sitemap-fairs.xml
    Sitemap: #{APP_URL}/sitemap-features.xml
    Sitemap: #{APP_URL}/sitemap-genes.xml
    Sitemap: #{APP_URL}/sitemap-images.xml
    Sitemap: #{APP_URL}/sitemap-misc.xml
    Sitemap: #{APP_URL}/sitemap-news.xml
    Sitemap: #{APP_URL}/sitemap-partners.xml
    Sitemap: #{APP_URL}/sitemap-shows.xml
    Sitemap: #{APP_URL}/sitemap-tags.xml
    Sitemap: #{APP_URL}/sitemap-videos.xml

  """
  res.send if ENABLE_WEB_CRAWLING then robotsText else "User-agent: *\nDisallow: /"
