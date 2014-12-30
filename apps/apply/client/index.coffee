Backbone = require 'backbone'
Router = require './router.coffee'

module.exports.init = ->
  router = new Router
  Backbone.history.start pushState: true
  require('./analytics.coffee')(router)
