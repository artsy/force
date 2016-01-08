Backbone = require 'backbone'
ArtworkFilterRouter = require './router.coffee'

module.exports.init = (options = {}) ->
  router = new ArtworkFilterRouter options
  Backbone.history.start(pushState: true) unless Backbone.History.started
  router
