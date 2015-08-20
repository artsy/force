express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/articles/sitemap.xml', routes.articles #news sitemap (articles < 5 days old)
app.get '/sitemap-misc.xml', routes.misc
app.get '/sitemap-articles-:page.xml', routes.articlesPage
app.get '/sitemap-images-:page.xml', routes.imagesPage
app.get '/sitemap.xml', routes.index
app.get '/sitemap-:resource-:page.xml', routes.resourcePage
app.get '/sitemap-cities.xml', routes.cities

