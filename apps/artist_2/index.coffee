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

app.get '/artist_2/:id/follow', routes.follow
app.get '/artist_2/:id', timeout('25s'), uncapitalize(), routes.index
for { slug } in sections
  app.get "/artist_2/:id/#{slug}", uncapitalize(), routes.tab
