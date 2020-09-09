Backbone = require 'backbone'
{ openAuthModal } = require '../../../lib/openAuthModal'
{ ModalType } = require "../../../../v2/Components/Authentication/Types"
{ Intent } = require "@artsy/cohesion"

module.exports = class SaveControls extends Backbone.View
  analyticsRemoveMessage: "Removed artwork from collection, via result rows"
  analyticsSaveMessage: "Added artwork to collection, via result rows"

  events:
    'click .overlay-button-save': 'save'

  initialize: (options) ->
    { @context_page, @context_module } = options
    throw new Error 'You must pass an el' unless @el?
    throw new Error 'You must pass a model' unless @model?
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
      openAuthModal(ModalType.signup, {
        copy: 'Sign up to save artworks'
        contextModule: @context_module
        afterSignUpAction: {
          action: 'save',
          objectId: @model.id
        }
        intent: Intent.saveArtwork
        destination: location.href
      })
      return false

    trackedProperties = {
      entity_id: @model.get '_id'
      entity_slug: @model.get 'id'
      context_page: @context_page
      context_module: @context_module
    }

    if @model.isSaved @artworkCollection
      window.analytics.track("Removed Artwork", trackedProperties)
      @artworkCollection.unsaveArtwork @model.id,
        error: => @$button.attr 'data-state', 'saved'
    else
      window.analytics.track("Saved Artwork", trackedProperties)
      @artworkCollection.saveArtwork @model.id,
        error: => @$button.attr 'data-state', 'unsaved'

      # Delay transition to red background color
      @$button.addClass 'is-clicked'
      setTimeout (=> @$button.removeClass 'is-clicked'), 1500
    false
