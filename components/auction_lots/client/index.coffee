Backbone = require 'backbone'
AuctionResultsRouter = require './router.coffee'

module.exports.init = ->
  Backbone.history.start pushState: true
  new AuctionResultsRouter
