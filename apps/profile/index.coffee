#
# /:id
#

express     = require 'express'
routes      = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

vanityRoutes = [
  # route            | gallery | institution | user | fair
  '/:id'             #    x         x
  '/:id/overview'    #    x
  '/:id/shows'       #    x         x
  '/:id/artists'     #    x
  '/:id/collection'  #              x
  '/:id/contact'     #    x
  '/:id/about'       #              x
  '/:id/posts'       #    x         x            x     x
  '/:id/shop'        #              x
  '/:id/favorites'   #                           x
]

app.get '/:id', routes.index
app.get '/:id/favorites', routes.favorites
app.get '/:id/overview', routes.partner
app.get '/:id/posts', routes.posts
app.get '/:id/contact', routes.partner
app.get '/:id/about', routes.partner
app.get '/:id/collection', routes.partner
app.get '/:id/shop', routes.partner
app.get '/:id/shows', routes.partner
app.get '/:id/artists', routes.partner
app.get '/:id/artist/:artistId', routes.partner
app.get '/:id/follow', routes.follow
