_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
bootstrap = require '../../../components/layout/bootstrap.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'

module.exports.UserSettingsView = class UserSettingsView extends Backbone.View

  events:
    'click .js--settings-logout': 'logout'

  logout: (e) ->
    e.preventDefault()
    $.ajax
      url: '/users/sign_out'
      type: 'DELETE'
      success: ->
        location.assign document.referrer or '/'
      error: (xhr, status, errorMessage) ->
        analyticsHooks.trigger 'auth:logged-out'
        $('#settings-generic-error')
          .text errorMessage
          .css('display', 'block')

module.exports.init = ->
  bootstrap()
  new UserSettingsView
    el: $('#settings')
