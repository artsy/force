Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
SaveControlsModal = require './modal.coffee'
{ track } = require '../../../lib/analytics.coffee'
ANALYITICS_REMOVE_MESSAGE = "Removed artwork from collection, via result rows"
ANALYTICS_SAVE_MESSAGE = "Added artwork to collection, via result rows"

module.exports = class SaveControls extends Backbone.View

  initialize: (options) ->
    throw 'You must pass an el' unless @el?
    throw 'You must pass a model' unless @model?
    return unless options.artworkCollection
    { @artworkCollection } = options
    @$button = @$('.overlay-button-save')
    @listenTo @artworkCollection, "add:#{@model.id}", @onArtworkSaveChange
    @listenTo @artworkCollection, "remove:#{@model.id}", @onArtworkSaveChange
    @onArtworkSaveChange()

  onArtworkSaveChange: ->
    state = if @model.isSaved @artworkCollection then 'saved' else 'unsaved'
    @$button.attr 'data-state', state

  save: (e) ->
    unless @artworkCollection
      track.funnel 'Triggered sign up form via save button'
      mediator.trigger 'open:auth',
        mode: 'register'
        copy: 'Sign up to save artworks'
        destination: "#{@model.href()}/save"
      return false
    if @model.isSaved @artworkCollection
      track.click ANALYITICS_REMOVE_MESSAGE, @model
      @artworkCollection.unsaveArtwork @model.id,
        error: => @$button.attr 'data-state', 'saved'
    else
      track.click ANALYTICS_SAVE_MESSAGE, @model
      @artworkCollection.saveArtwork @model.id,
        error: => @$button.attr 'data-state', 'unsaved'
      # Delay transition to red background color
      @$button.addClass 'is-clicked'
      setTimeout (=> @$button.removeClass 'is-clicked'), 1500
    false

  events:
    'click .overlay-button-save': 'save'
    'click .save-controls2-add-to-collection': 'openCollectionModal'

  openCollectionModal: ->
    new SaveControlsModal width: 500, model: @model
    false

