_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Profile = require '../../../models/profile.coffee'
Fair = require '../../../models/fair.coffee'
{ openAuthModal } = require '../../../lib/openAuthModal'
{ ModalType } = require "@artsy/reaction/dist/Components/Authentication/Types"
CurrentUser = require '../../../models/current_user.coffee'
FlashMessage = require '../../flash/index.coffee'

module.exports = class FairHeaderView extends Backbone.View

  events:
    'click .mlh-login': 'login'
    'click .mlh-signup': 'signup'
    'click .mlh-logout': 'logout'

  initialize: (options) ->
    { @fair } = options
    @currentUser = CurrentUser.orNull()

  signup: (e) ->
    e.preventDefault()
    openAuthModal(ModalType.signup, {
      destination: location.href
      intent: 'signup'
      contextModule: 'Header'
    })

  login: (e) ->
    e.preventDefault()
    openAuthModal(ModalType.login, {
      destination: location.href
      intent: 'login'
      contextModule: 'Header'
    })

  logout: (e) ->
    e.preventDefault()
    $.ajax
      url: '/users/sign_out'
      type: 'DELETE'
      success: ->
        location.reload()
      error: (xhr, status, errorMessage) ->
        new FlashMessage message: errorMessage
