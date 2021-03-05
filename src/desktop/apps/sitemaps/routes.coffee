{ APP_URL, ENABLE_WEB_CRAWLING, SITEMAP_BASE_URL } = require('sharify').data
{ parse } = require 'url'
httpProxy = require 'http-proxy'
sitemapProxy = httpProxy.createProxyServer(target: SITEMAP_BASE_URL)

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
    Sitemap: #{APP_URL}/sitemap-artist-series.xml
    Sitemap: #{APP_URL}/sitemap-artworks.xml
    Sitemap: #{APP_URL}/sitemap-cities.xml
    Sitemap: #{APP_URL}/sitemap-collect.xml
    Sitemap: #{APP_URL}/sitemap-fairs.xml
    Sitemap: #{APP_URL}/sitemap-features.xml
    Sitemap: #{APP_URL}/sitemap-genes.xml
    Sitemap: #{APP_URL}/sitemap-images.xml
    Sitemap: #{APP_URL}/sitemap-misc.xml
    Sitemap: #{APP_URL}/sitemap-partners.xml
    Sitemap: #{APP_URL}/sitemap-shows.xml
    Sitemap: #{APP_URL}/sitemap-tags.xml
    Sitemap: #{APP_URL}/sitemap-videos.xml

  """
  res.send if ENABLE_WEB_CRAWLING then robotsText else "User-agent: *\nDisallow: /"
