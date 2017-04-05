express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/robots.txt', routes.robots

app.get ['/sitemap-articles.xml', '/sitemap-articles-:timestamp.xml'], routes.sitemaps
app.get ['/sitemap-artists.xml', '/sitemap-artists-:timestamp.xml'], routes.sitemaps
app.get ['/sitemap-artist-images.xml', '/sitemap-artist-images-:slug.xml'], routes.sitemaps
app.get ['/sitemap-artworks.xml', '/sitemap-artworks-:timestamp.xml'], routes.sitemaps
app.get '/sitemap-cities.xml', routes.cities
app.get ['/sitemap-fairs.xml', '/sitemap-fairs-:timestamp.xml'], routes.sitemaps
app.get ['/sitemap-features.xml', '/sitemap-features-:timestamp.xml'], routes.sitemaps
app.get '/sitemap-genes.xml', routes.sitemaps
app.get ['/sitemap-images.xml', '/sitemap-images-:timestamp.xml'], routes.sitemaps
app.get '/sitemap-misc.xml', routes.misc
app.get '/sitemap-news.xml', routes.news
app.get ['/sitemap-partners.xml', '/sitemap-partners-:timestamp.xml'], routes.sitemaps
app.get ['/sitemap-shows.xml', '/sitemap-shows-:timestamp.xml'], routes.sitemaps
app.get '/sitemap-tags.xml', routes.sitemaps
app.get ['/sitemap-videos.xml', '/sitemap-videos-:timestamp.xml'], routes.sitemaps
