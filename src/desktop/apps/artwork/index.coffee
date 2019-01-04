express = require 'express'
routes = require './routes'
maybeNewArtworkPage = require './maybe_new_artwork_page'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artwork/:id', maybeNewArtworkPage, routes.index
app.get '/artwork/:id/download/:filename', routes.download
app.get '/artwork/:id/:action', maybeNewArtworkPage, routes.index
