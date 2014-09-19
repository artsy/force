Backbone = require 'backbone'
ArtworkFilterRouter = require './router.coffee'

module.exports.init = (options = {}) ->
  router = new ArtworkFilterRouter options
  require './analytics.coffee'
  Backbone.history.start(pushState: true) unless Backbone.History.started
  router
