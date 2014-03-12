#
# Auction results for artists
#

express   = require 'express'
routes    = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/artist/:id/auction-results', routes.artist
app.get '/artwork/:id/auction-results', routes.artwork