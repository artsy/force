#
# /:id
#

express     = require 'express'
routes      = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

fairRoutes = [
  '/:id/info'
  '/:id/for-you'
  '/:id/overview'
  '/:id/search'

  '/:id/browse/artist/:id'
  '/:id/browse/artists'

  '/:id/browse/shows'
  '/:id/browse/shows/*params'

  '/:id/browse/exhibitors'

  '/:id/browse/filter'
  '/:id/browse/filter/*params'
]

app.get '/:id/info', routes.info
app.get '/:id/for-you', routes.forYou
app.get '/:id/overview', routes.overview
app.get '/:id/search', routes.search

app.get '/:id/browse/exhibitors', routes.exhibitors
app.get '/:id/browse/artists', routes.artists
