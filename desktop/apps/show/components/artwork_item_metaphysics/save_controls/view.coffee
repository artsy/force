Backbone = require 'backbone'
mediator = require '../../../../../lib/mediator'
analyticsHooks = require '../../../../../lib/analytics_hooks'

module.exports = class SaveControls extends Backbone.View
  analyticsRemoveMessage: "Removed artwork from collection, via result rows"
  analyticsSaveMessage: "Added artwork to collection, via result rows"

  events:
    'click .overlay-button-save': 'save'

  initialize: (options) ->
    throw 'You must pass an el' unless @el?
    return unless options.artworkCollection && options.artwork

    { @artworkCollection, @artwork, @context_page } = options

    @$button = @$('.overlay-button-save')

    @listenTo @artworkCollection, "add:#{@artwork.id}", @onArtworkSaveChange
    @listenTo @artworkCollection, "remove:#{@artwork.id}", @onArtworkSaveChange

    @onArtworkSaveChange()

  onArtworkSaveChange: ->
    state = if @artworkCollection.isSaved(@artwork) then 'saved' else 'unsaved'
    @$button.attr 'data-state', state

  save: (e) ->
    unless @artworkCollection
      analyticsHooks.trigger 'save:sign-up'
      mediator.trigger 'open:auth',
        mode: 'register'
        copy: 'Sign up to save artworks'
        redirectTo: "#{@artwork.href}/save"
      return false

    trackedProperties = {
      entity_id: @artwork._id
      entity_slug: @artwork.id
      context_page: @context_page
    }

    if @artworkCollection.isSaved(@artwork)
      analyticsHooks.trigger 'save:artwork-remove',trackedProperties
      @artworkCollection.unsaveArtwork @artwork.id,
        error: => @$button.attr 'data-state', 'saved'
    else
      analyticsHooks.trigger 'save:artwork-save', trackedProperties
      @artworkCollection.saveArtwork @artwork.id,
        error: => @$button.attr 'data-state', 'unsaved'

      # Delay transition to red background color
      @$button.addClass 'is-clicked'
      setTimeout (=> @$button.removeClass 'is-clicked'), 1500
    false
