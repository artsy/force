Backbone = require 'backbone'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
{ openAuthModal } = require '../../../lib/openAuthModal'
{ ModalType } = require "@artsy/reaction/dist/Components/Authentication/Types"

module.exports = class SaveControls extends Backbone.View
  analyticsRemoveMessage: "Removed artwork from collection, via result rows"
  analyticsSaveMessage: "Added artwork to collection, via result rows"

  events:
    'click .overlay-button-save': 'save'

  initialize: (options) ->
    throw new Error 'You must pass an el' unless @el?
    throw new Error 'You must pass a model' unless @model?
    return unless options.artworkCollection

    { @artworkCollection, @context_page, @context_module } = options

    @$button = @$('.overlay-button-save')

    @listenTo @artworkCollection, "add:#{@model.id}", @onArtworkSaveChange
    @listenTo @artworkCollection, "remove:#{@model.id}", @onArtworkSaveChange

    @onArtworkSaveChange()

  onArtworkSaveChange: ->
    state = if @model.isSaved @artworkCollection then 'saved' else 'unsaved'
    @$button.attr 'data-state', state

  save: (e) ->
    unless @artworkCollection
      analyticsHooks.trigger 'save:sign-up'
      openAuthModal(ModalType.signup, {
        copy: 'Sign up to save artworks'
        afterSignUpAction: {
          action: 'save',
          objectId: @model.id
        }
        intent: 'save artwork'
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
      analyticsHooks.trigger 'save:remove-artwork', trackedProperties
      @artworkCollection.unsaveArtwork @model.id,
        error: => @$button.attr 'data-state', 'saved'
    else
      analyticsHooks.trigger 'save:save-artwork', trackedProperties
      @artworkCollection.saveArtwork @model.id,
        error: => @$button.attr 'data-state', 'unsaved'

      # Delay transition to red background color
      @$button.addClass 'is-clicked'
      setTimeout (=> @$button.removeClass 'is-clicked'), 1500
    false
