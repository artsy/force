#
# The artist page found at /artist/:id.
#

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
for { slug } in sections
  app.get "/artist/:id/#{slug}", uncapitalize(), routes.tab
