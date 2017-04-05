Backbone = require 'backbone'
Router = require './router'

module.exports.init = ->
  new Router
  Backbone.history.start pushState: true

