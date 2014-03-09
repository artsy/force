#
# The artist page found at /artist/:id.
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artist/:id', routes.index
app.get '/artist/:id/follow', routes.follow
app.get '/artist/:id/*', routes.index
