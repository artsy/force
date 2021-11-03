Backbone = require 'backbone'
bootstrap = require '../../../components/layout/bootstrap'
{ logoutEventHandler } = require '../../../../desktop/lib/deprecated_global_client_setup.tsx'

module.exports.UserSettingsView = class UserSettingsView extends Backbone.View

  events:
    'click .js--settings-logout': 'logout'

  logout: (e) ->
    e.preventDefault()
    logoutEventHandler('/')

module.exports.init = ->
  bootstrap()
  new UserSettingsView
    el: $('#settings')
