#
# Auction results
#

express = require 'express'
routes = require './routes'
timeout = require 'connect-timeout'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artist/:id/auction-results', timeout('25s'), routes.artist
app.get '/artist/:artist_id/auction-result/:id', timeout('25s'), routes.detail
app.get '/artwork/:id/auction-results', timeout('25s'), routes.artwork
