express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/robots.txt', routes.robots
app.get '/news_sitemap.xml', routes.articles
app.get '/video_sitemap.xml', routes.video
app.get '/sitemap-misc.xml', routes.misc
app.get '/sitemap-cities.xml', routes.cities
app.get '/sitemap.xml', routes.index
app.get ['/sitemap-artworks.xml', '/sitemap-artworks-:timestamp.xml'], routes.sitemaps
app.get ['/sitemap-images.xml', '/sitemap-images-:timestamp.xml'], routes.sitemaps
app.get ['/sitemap-artists.xml', '/sitemap-artists-:timestamp.xml'], routes.sitemaps
app.get ['/sitemap-genes.xml', '/sitemap-genes-:timestamp.xml'], routes.sitemaps
app.get ['/sitemap-partners.xml', '/sitemap-partners-:timestamp.xml'], routes.sitemaps
app.get ['/sitemap-articles.xml', '/sitemap-articles-:timestamp.xml'], routes.sitemaps  # archive of all articles (for main sitemap, not news-specific sitemap)
app.get ['/sitemap-shows.xml', '/sitemap-shows-:timestamp.xml'], routes.sitemaps
app.get '/sitemap-:resource-:page.xml', routes.resourcePage
