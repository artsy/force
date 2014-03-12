#
# Auction results
#

express   = require 'express'
routes    = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artist/:id/auction-results', routes.artist
app.get '/artist/:artist_id/auction-result/:id', routes.detail
app.get '/artwork/:id/auction-results', routes.artwork
