#
# The artist page found at /artist/:id.
#

_ = require 'underscore'
express = require 'express'
routes = require './routes'
sections = require './sections'
timeout = require 'connect-timeout'
uncapitalize = require 'express-uncapitalize'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artist/:id/follow', routes.follow
app.get '/artist/:id', timeout('25s'), uncapitalize(), routes.index
_.map sections, ({ slug }) ->
  app.get "/artist/:id/#{slug}", uncapitalize(), routes.tab
app.get '/artist/data/:id/:section', routes.data # Temporary
