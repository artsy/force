express = require 'express'
routes = require './routes.coffee'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

setFilterRoot = (req, res, next) ->
  res.locals.sd.FILTER_ROOT = "#{res.locals.profile.id}/collection"
  next()

app.get '/:id', setFilterRoot, routes.overview
app.get '/:id/overview', setFilterRoot, routes.redirectToOverview
app.get '/:id/contact', setFilterRoot, routes.contact
app.get '/:id/about', setFilterRoot, routes.about
app.get '/:id/collection', setFilterRoot, routes.collection
app.get '/:id/shop', setFilterRoot, routes.shop
app.get '/:id/shows', setFilterRoot, routes.shows
app.get '/:id/artists', setFilterRoot, routes.artists
app.get '/:id/artist/:artistId', setFilterRoot, routes.artist
app.get '/:id/articles', setFilterRoot, routes.articles
