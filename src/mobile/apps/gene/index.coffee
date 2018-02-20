#
# The gene detail page
#

express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.get '/gene/:id', routes.index
app.get '/gene/:id/artists', routes.index
