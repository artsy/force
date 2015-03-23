Backbone = require 'backbone'
Router = require './router.coffee'
analytics = require './analytics.coffee'

module.exports.init = ->
  new Router
  Backbone.history.start pushState: true
  analytics()
