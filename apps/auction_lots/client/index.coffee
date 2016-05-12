Backbone = require 'backbone'
AuctionResultsRouter = require '../../../components/auction_lots/client/router.coffee'

module.exports.init = ->
  Backbone.history.start pushState: true
  new AuctionResultsRouter
