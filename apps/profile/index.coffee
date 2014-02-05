#
# /:id
#

express = require 'express'
routes  = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

vanityRoutes = [
  '/:id'
  '/:id/favorites'
  '/:id/posts'
]

app.get(route, routes.setProfile) for route in vanityRoutes
app.get '/:id', routes.index
app.get '/:id/favorites', routes.favorites
app.get '/:id/posts', routes.posts
