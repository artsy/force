Backbone = require 'backbone'
AuctionResultsRouter = require './router'

module.exports.init = ->
  Backbone.history.start pushState: true
  new AuctionResultsRouter
