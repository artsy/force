#
# /partner
#

express = require 'express'
routes  = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

vanityRoutes = [
  # route            | gallery | institution
  '/:id'             #    x         x
  '/:id/overview'    #    x
  '/:id/shows'       #    x         x
  '/:id/artists'     #    x
  '/:id/collection'  #              x
  '/:id/contact'     #    x
  '/:id/about'       #              x
  '/:id/posts'       #    x         x
  '/:id/shop'        #    x         x
]

app.get(route, routes.setProfile) for route in vanityRoutes
app.get '/:id/contact', routes.contact
