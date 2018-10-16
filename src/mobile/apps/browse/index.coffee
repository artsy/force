express = require 'express'
routes = require './routes'
sd = require('sharify').data

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/browse', routes.to '/collect'
app.get '/browse/artworks', routes.to '/collect'
app.get '/filter/artworks', routes.to '/collect'
