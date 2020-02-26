express = require 'express'
routes = require './routes'
{ skipIfClientSideRoutingEnabled } = require("../../components/split_test/skipIfClientSideRoutingEnabled")
{ getSplitTest } = require "../../components/split_test/splitTestContext"

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

# FIXME: Remove once A/B test completes
if getSplitTest('EXPERIMENTAL_APP_SHELL')
  app.get '/auction-registration-modal/:id', routes.modalAuctionRegistration
else
  app.get '/auction-registration/:id', routes.modalAuctionRegistration

app.get '/auction/:id/buyers-premium', routes.buyersPremium
