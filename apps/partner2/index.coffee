express = require 'express'
routes = require './routes.coffee'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/:id', routes.requireAdmin, routes.requireNewLayout, routes.overview
app.get '/:id/overview', routes.requireAdmin, routes.requireNewLayout, routes.redirectToOverview
app.get '/:id/shows', routes.requireAdmin, routes.requireNewLayout, routes.shows
app.get '/:id/works', routes.requireAdmin, routes.requireNewLayout, routes.works
app.get '/:id/collection', routes.requireAdmin, routes.requireNewLayout, routes.collection
app.get '/:id/shop', routes.requireAdmin, routes.requireNewLayout, routes.shop
app.get '/:id/artists', routes.requireAdmin, routes.requireNewLayout, routes.artists
app.get '/:id/artist/:artistId', routes.requireAdmin, routes.requireNewLayout, routes.artist
app.get '/:id/articles', routes.requireAdmin, routes.requireNewLayout, routes.articles
app.get '/:id/contact', routes.requireAdmin, routes.requireNewLayout, routes.contact
app.get '/:id/about', routes.requireAdmin, routes.requireNewLayout, routes.about
