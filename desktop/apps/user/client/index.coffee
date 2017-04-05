Backbone = require 'backbone'
UserSettingsRouter = require './router'

module.exports.init = ->
  new UserSettingsRouter
  Backbone.history.start pushState: true
