Backbone = require 'backbone'
Router   = require './router.coffee'

module.exports.init = ->
  new Router
  Backbone.history.start pushState: true
