Backbone = require 'backbone'
mediator = require '../../../../../lib/mediator.coffee'
track = require('../../../../../lib/analytics.coffee').track

module.exports = class SaveControls extends Backbone.View
  analyticsRemoveMessage: "Removed artwork from collection, via result rows"
  analyticsSaveMessage: "Added artwork to collection, via result rows"

  events:
    'click .overlay-button-save': 'save'

  initialize: (options) ->
    throw 'You must pass an el' unless @el?
    return unless options.artworkCollection && options.artwork

    { @artworkCollection, @artwork } = options

    @$button = @$('.overlay-button-save')

    @listenTo @artworkCollection, "add:#{@artwork.id}", @onArtworkSaveChange
    @listenTo @artworkCollection, "remove:#{@artwork.id}", @onArtworkSaveChange

    @onArtworkSaveChange()

  onArtworkSaveChange: ->
    state = if @artworkCollection.isSaved(@artwork) then 'saved' else 'unsaved'
    @$button.attr 'data-state', state

  save: (e) ->
    unless @artworkCollection
      track.funnel 'Triggered sign up form via save button'
      mediator.trigger 'open:auth',
        mode: 'register'
        copy: 'Sign up to save artworks'
        destination: "#{@artwork.href}/save"
      return false

    if @artworkCollection.isSaved(@artwork)
      track.click @analyticsRemoveMessage, @artwork
      @artworkCollection.unsaveArtwork @artwork.id,
        error: => @$button.attr 'data-state', 'saved'
    else
      track.click @analyticsSaveMessage, @artwork
      @artworkCollection.saveArtwork @artwork.id,
        error: => @$button.attr 'data-state', 'unsaved'

      # Delay transition to red background color
      @$button.addClass 'is-clicked'
      setTimeout (=> @$button.removeClass 'is-clicked'), 1500
    false
