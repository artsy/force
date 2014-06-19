Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
SaveControlsModal = require './modal.coffee'
CurrentUser = require '../../../models/current_user.coffee'
{ track } = require '../../../lib/analytics.coffee'

module.exports = class SaveControls extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()

  showSignupModal: ->
    track.funnel 'Triggered sign up form via save button'
    mediator.trigger 'open:auth',
      mode: 'register'
      copy: 'Sign up to save artworks'
      destination: "#{@model.href()}/save"
    true

  events:
    'click .overlay-button-save, .circle-icon-button-save': 'openCollectionModal'

  openCollectionModal: (e) ->
    e?.preventDefault()
    return @showSignupModal() unless @user
    new SaveControlsModal width: 500, model: @model