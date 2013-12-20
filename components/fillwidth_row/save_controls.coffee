Backbone  = require 'backbone'
mediator  = require '../../lib/mediator.coffee'
track     = require('../../lib/analytics.coffee').track

module.exports = class SaveControls extends Backbone.View
  analyticsRemoveMessage: "Removed artwork from collection, via result rows"
  analyticsSaveMessage: "Added artwork to collection, via result rows"

  events:
    'click .overlay-button-save': 'save'

  initialize: (options) ->
    throw 'You must pass an el' unless @el?
    throw 'You must pass a model' unless @model?
    return unless options.artworkCollection

    { @artworkCollection } = options

    @$button = @$('.overlay-button-save')

    @listenTo @artworkCollection, "add:#{@model.get('id')}", @onArtworkSaveChange
    @listenTo @artworkCollection, "remove:#{@model.get('id')}", @onArtworkSaveChange
    @onArtworkSaveChange()

  onArtworkSaveChange: ->
    state = if @model.isSaved @artworkCollection then 'saved' else 'unsaved'
    @$button.attr 'data-state', state

  save: (e) =>
    unless @artworkCollection
      mediator.trigger 'open:auth', { mode: 'login' }
      return false

    if @model.isSaved @artworkCollection
      track.click @analyticsRemoveMessage, @model
      @artworkCollection.unsaveArtwork @model.get('id'),
        error: => @$button.attr 'data-state', 'saved'
    else
      track.click @analyticsSaveMessage, @model
      @artworkCollection.saveArtwork @model.get('id'),
        error: => @$button.attr 'data-state', 'unsaved'

      # Delay transition to red background color
      @$button.addClass 'is-clicked'
      setTimeout (=> @$button.removeClass 'is-clicked'), 1500
    false
