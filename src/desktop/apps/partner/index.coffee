express = require 'express'
routes = require './routes.coffee'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/:id', routes.overview
app.get '/:id/overview', routes.redirectToOverview
app.get '/:id/contact', routes.contact
app.get '/:id/about', routes.about
app.get '/:id/collection', routes.collection
app.get '/:id/shop', routes.shop
app.get '/:id/works', routes.works
app.get '/:id/shows', routes.shows
app.get '/:id/artists', routes.artists
app.get '/:id/artist/:artistId', routes.artist
app.get '/:id/articles', routes.articles
app.get '/:id/article/:articleId', routes.articles
