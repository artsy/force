Backbone = require 'backbone'
Router   = require './router.coffee'
bootstrap = require '../../../components/layout/bootstrap.coffee'

module.exports.init = ->
  bootstrap()
  new Router
  Backbone.history.start pushState: true
