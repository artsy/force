_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Profile = require '../../../models/profile.coffee'
Fair = require '../../../models/fair.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
AuthModalView = require '../../auth_modal/view.coffee'
FlashMessage = require '../../flash/index.coffee'

module.exports = class FairHeaderView extends Backbone.View

  events:
    'click .mlh-login': 'login'
    'click .mlh-signup': 'signup'
    'click .mlh-logout': 'logout'

  initialize: (options) ->
    { @fair } = options
    @currentUser = CurrentUser.orNull()

  openAuth: (options) ->
    @modal = new AuthModalView _.extend({ width: '500px' }, options)

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'signup'

  login: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'login'

  logout: (e) ->
    e.preventDefault()
    $.ajax
      url: '/users/sign_out'
      type: 'DELETE'
      success: ->
        location.reload()
      error: (xhr, status, errorMessage) ->
        new FlashMessage message: errorMessage
