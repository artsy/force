Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
SaveControlsModal = require './modal.coffee'
{ track } = require '../../../lib/analytics.coffee'

module.exports = class SaveControls extends Backbone.View

  initialize: (options) ->
    throw 'You must pass an el' unless @el?
    throw 'You must pass a model' unless @model?
    return unless options.artworkCollection
    { @artworkCollection } = options

  showSignupModal: ->
    return false if @artworkCollection
    track.funnel 'Triggered sign up form via save button'
    mediator.trigger 'open:auth',
      mode: 'register'
      copy: 'Sign up to save artworks'
      destination: "#{@model.href()}/save"
    true

  events:
    'click .overlay-button-save': 'openCollectionModal'

  openCollectionModal: ->
    return if @showSignupModal()
    new SaveControlsModal width: 500, model: @model
    false

