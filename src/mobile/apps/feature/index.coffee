#
# The feature page (e.g. Whitney Sale or Venice Bienale)
#

express = require 'express'
routes = require './routes'
accounting = require 'accounting'

app = module.exports = express()
app.locals.accounting = accounting

app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'
app.get '/feature/:id', routes.index
app.get '/feature/:id/:queryParams', routes.index

app.get '/auction/:id/bid/:artworkId', routes.bid
# TODO: as of 7/15/19 none of these confirm-registration routes
# have been called for > 30 days. Investigate removal.
app.get '/artwork/:id/confirm-registration', routes.confirmRegistration('artwork')
app.get '/auction/:id/bid/:artworkId/confirm-registration', routes.confirmRegistration('bid')

# Legacy route support for Eigen
app.get '/feature/:id/bid/:artworkId', routes.bid
app.get '/feature/:id/bid/:artworkId/confirm-registration', routes.confirmRegistration('bid')
# Also:
app.get '/auctions/:id/bid/:artworkId', routes.bid
app.get '/auctions/:id/bid/:artworkId/confirm-registration', routes.confirmRegistration('bid')
