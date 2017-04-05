Backbone = require 'backbone'
Router   = require './router'
bootstrap = require '../../../components/layout/bootstrap'

module.exports.init = ->
  bootstrap()
  new Router
  Backbone.history.start pushState: true
