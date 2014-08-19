Backbone = require 'backbone'
ArtworkFilterRouter = require './router.coffee'

module.exports.init = (options = {}) ->
  new ArtworkFilterRouter options
  Backbone.history.start pushState: true
