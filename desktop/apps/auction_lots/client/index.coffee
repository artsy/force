Backbone = require 'backbone'
AuctionResultsRouter = require '../../../components/auction_lots/client/router'

module.exports.init = ->
  Backbone.history.start pushState: true
  new AuctionResultsRouter
