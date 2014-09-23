#
# The artist page found at /artist/:id.
#

_ = require 'underscore'
express = require 'express'
routes = require './routes'
sections = require './sections'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artist/:id/follow', routes.follow
app.get '/artist/:id', routes.index
_.map sections, (slug) -> app.get "/artist/:id/#{slug}", routes.tab
app.get '/artist/:id/*', routes.index
