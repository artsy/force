Backbone = require 'backbone'
UserSettingsRouter = require './router.coffee'

module.exports.init = ->
  new UserSettingsRouter
  Backbone.history.start pushState: true
