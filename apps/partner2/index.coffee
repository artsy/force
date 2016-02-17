express = require 'express'
routes = require './routes.coffee'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/:id', routes.requireAdmin, routes.overview
app.get '/:id/overview', routes.requireAdmin, routes.redirectToOverview
app.get '/:id/shows', routes.requireAdmin, routes.shows
app.get '/:id/works', routes.works
app.get '/:id/collection', routes.collection
app.get '/:id/shop', routes.shop
app.get '/:id/artists', routes.artists
app.get '/:id/artist/:artistId', routes.artist
