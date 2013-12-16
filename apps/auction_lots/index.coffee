#
# Auction results for artists
#

express   = require 'express'
routes    = require './routes'

app = module.exports = express()
app.set 'views', __dirname
app.set 'view engine', 'jade'

app.get '/artist/:id/auction-results', routes.index
