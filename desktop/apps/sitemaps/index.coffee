express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/robots.txt', routes.robots
app.get '/articles/sitemap.xml', routes.articles #news sitemap (articles < 5 days old)
app.get '/sitemap-misc.xml', routes.misc
app.get '/sitemap-articles-:page.xml', routes.articlesPage #archive of all articles (for main sitemap, not news-specific sitemap)
app.get '/sitemap.xml', routes.index
app.get '/sitemap-artworks-:page-:date.xml', routes.artworksPage('artworks')
app.get '/sitemap-images-:page-:date.xml', routes.artworksPage('images')
app.get '/sitemap-:resource-:page.xml', routes.resourcePage
app.get '/sitemap-cities.xml', routes.cities
app.get '/images_sitemap.xml', routes.imagesIndex
app.get '/sitemap-bing-images.json', routes.bingjson
app.get '/sitemap-bing-images-new.json', routes.bingNew
app.get '/video_sitemap.xml', routes.video
