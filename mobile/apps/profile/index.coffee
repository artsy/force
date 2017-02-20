#
# The profile detail page and profile vanity url redirector.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
vanityRoutes = [
  '/profile/:id'
  '/:id'
  '/:id/artists'
  '/:id/artist/:artistId'
  '/:id/info'
  '/:id/info/visitors'
  '/:id/info/events'
  '/:id/info/events/:eventId'
  '/:id/info/programming'
  '/:id/info/artsy-at-the-fair'
  '/:id/info/about-the-fair'
  '/:id/info/armory-arts-week'
  '/:id/info/armory-arts-week/all'
  '/:id/live'
  '/:id/for-you'
  '/:id/feed'
  '/:id/programming'
  '/:id/programming/event/:eventId'
  '/:id/browse/show/:partnerId'
  '/:id/browse/booths'
  '/:id/browse/booths/section'
  '/:id/browse/booths/section/:section'
  '/:id/browse/artist/:artistId'
  '/:id/browse/exhibitors'
  '/:id/browse/artists'
  '/:id/browse/artworks'
  '/:id/browse/filter'
  '/:id/collection'
  '/:id/contact'
  '/:id/overview'
  '/:id/articles'
  '/:id/search'
  '/:id/shop'
  '/:id/shows'
]

app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get(route, routes.setProfile) for route in vanityRoutes
app.get '/profile/:id', routes.index
app.get '/editorial', routes.redirectEditorial
app.get '/:id', routes.index
