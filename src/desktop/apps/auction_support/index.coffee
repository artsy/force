express = require 'express'
routes = require './routes'
{ skipIfClientSideRoutingEnabled } = require("../../components/split_test/skipIfClientSideRoutingEnabled")

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/auction-registration/:id', routes.modalAuctionRegistration
app.get '/auction/:id/buyers-premium', routes.buyersPremium
