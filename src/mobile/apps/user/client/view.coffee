Backbone = require 'backbone'
bootstrap = require '../../../components/layout/bootstrap.coffee'
{ logoutEventHandler } = require '../../../../desktop/lib/global_client_setup.tsx'

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
