express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/robots.txt', routes.robots
app.get '/sitemap-misc.xml', routes.misc

standardSitemapRoutes = [
  '/sitemap-articles-:timestamp.xml',
  '/sitemap-articles.xml',
  '/sitemap-artist-images-:slug.xml',
  '/sitemap-artist-images.xml',
  '/sitemap-artist-series-:timestamp.xml',
  '/sitemap-artist-series.xml',
  '/sitemap-artists-:timestamp.xml',
  '/sitemap-artists.xml',
  '/sitemap-artworks-:timestamp.xml',
  '/sitemap-artworks.xml',
  '/sitemap-cities.xml',
  '/sitemap-collect.xml',
  '/sitemap-fairs-:timestamp.xml',
  '/sitemap-fairs.xml',
  '/sitemap-features-:timestamp.xml',
  '/sitemap-features.xml',
  '/sitemap-genes.xml',
  '/sitemap-images-:timestamp.xml',
  '/sitemap-images.xml',
  '/sitemap-partners-:timestamp.xml',
  '/sitemap-partners.xml',
  '/sitemap-shows-:timestamp.xml',
  '/sitemap-shows.xml',
  '/sitemap-tags.xml',
  '/sitemap-videos-:timestamp.xml',
  '/sitemap-videos.xml',
]

app.get standardSitemapRoutes, routes.sitemaps
