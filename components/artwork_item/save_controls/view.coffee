Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
track = require('../../../lib/analytics.coffee').track

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

    @listenTo @artworkCollection, "add:#{@model.id}", @onArtworkSaveChange
    @listenTo @artworkCollection, "remove:#{@model.id}", @onArtworkSaveChange

    # Embed labs feature
    if @artworkCollection.embeddableCollection
      @listenTo @artworkCollection.embeddableCollection, "embeddable:#{@model.id}", @onEmbeddableChange

    @onArtworkSaveChange()

  onEmbeddableChange: ->
    @$el.append "<div class='overlay-button-embed'></div>"
    @$('.overlay-button-embed').click (e) =>
      e.preventDefault()
      window.location = @model.embedUrl()
      false

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
      track.click @analyticsRemoveMessage, @model
      @artworkCollection.unsaveArtwork @model.id,
        error: => @$button.attr 'data-state', 'saved'
    else
      track.click @analyticsSaveMessage, @model
      @artworkCollection.saveArtwork @model.id,
        error: => @$button.attr 'data-state', 'unsaved'

      # Delay transition to red background color
      @$button.addClass 'is-clicked'
      setTimeout (=> @$button.removeClass 'is-clicked'), 1500
    false
