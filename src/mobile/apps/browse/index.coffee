express = require 'express'
routes = require './routes'
sd = require('sharify').data

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

if sd.NEW_COLLECT_PAGE_ENABLED is not "true"
  app.get '/collect', routes.index
app.get '/browse', routes.to '/collect'
app.get '/browse/artworks', routes.to '/collect'
app.get '/filter/artworks', routes.to '/collect'
