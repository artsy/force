Backbone = require 'backbone'
AboutRouter = require './router.coffee'

module.exports.init = ->
  new AboutRouter
  Backbone.history.start pushState: true
