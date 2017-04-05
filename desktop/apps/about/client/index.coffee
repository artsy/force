Backbone = require 'backbone'
AboutRouter = require './router'

module.exports.init = ->
  new AboutRouter
  Backbone.history.start pushState: true
