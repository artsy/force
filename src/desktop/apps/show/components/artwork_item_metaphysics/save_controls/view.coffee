Backbone = require 'backbone'
{ openAuthModal } = require '../../../../../lib/openAuthModal'
{ ModalType } = require "../../../../../../v2/Components/Authentication/Types"
{ Intent } = require "@artsy/cohesion"

module.exports = class SaveControls extends Backbone.View
  events:
    'click .overlay-button-save': 'save'

  initialize: (options) ->
    throw new Error 'You must pass an el' unless @el?
    return unless options.artwork
    { @artworkCollection, @artwork, @context_page, @context_module } = options
    @$button = @$('.overlay-button-save')

    @listenTo @artworkCollection, "add:#{@artwork.id}", @onArtworkSaveChange
    @listenTo @artworkCollection, "remove:#{@artwork.id}", @onArtworkSaveChange

    @onArtworkSaveChange() if @artworkCollection

  onArtworkSaveChange: ->
    state = if @artworkCollection.isSaved(@artwork) then 'saved' else 'unsaved'
    @$button.attr 'data-state', state

  save: (e) ->
    e.preventDefault()
    unless @artworkCollection
      openAuthModal(ModalType.signup, {
        copy: 'Sign up to save artworks'
        contextModule: @context_module
        intent: Intent.saveArtwork
        destination: location.href
        afterSignUpAction: {
          action: 'save',
          objectId: @artwork.id
        }
      })
      return false

    trackedProperties = {
      entity_id: @artwork._id
      entity_slug: @artwork.id
      context_page: @context_page
    }

    if @artworkCollection.isSaved(@artwork)
      window.analytics.track(
        "Removed artwork from collection, via result rows",
        trackedProperties
      )
      @artworkCollection.unsaveArtwork @artwork.id,
        error: => @$button.attr 'data-state', 'saved'
    else
      window.analytics.track(
        "Added artwork to collection, via result rows",
        trackedProperties
      )
      @artworkCollection.saveArtwork @artwork.id,
        error: => @$button.attr 'data-state', 'unsaved'

      # Delay transition to red background color
      @$button.addClass 'is-clicked'
      setTimeout (=> @$button.removeClass 'is-clicked'), 1500
    false
