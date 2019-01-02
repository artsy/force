express = require 'express'
routes = require './routes'
maybeNewArtistPage = require '../../../desktop/apps/artwork/maybe_new_artwork_page'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artwork/:id', maybeNewArtistPage, routes.index
app.get '/artwork/:id/ask_specialist', maybeNewArtistPage, routes.askSpecialist
