express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'


app.get '/:profileId/collection/:id', routes.collection
# Just render the index or pass if it's not a user.
# Routing is handled client-side.
for route in ['/:id', '/:id/favorites', '/:id/posts']
  app.get route, routes.index
