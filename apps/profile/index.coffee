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
app.get '/:id/posts', routes.posts
app.get '/:id/contact', routes.contact
app.get '/:id/about', routes.about
app.get '/:id/collection', routes.collection
