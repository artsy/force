Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'

module.exports = class SaveControls extends Backbone.View
  analyticsRemoveMessage: "Removed artwork from collection, via result rows"
  analyticsSaveMessage: "Added artwork to collection, via result rows"

  events:
    'click .overlay-button-save': 'save'

  initialize: (options) ->
    throw 'You must pass an el' unless @el?
    throw 'You must pass a model' unless @model?
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
      mediator.trigger 'open:auth',
        mode: 'register'
        copy: 'Sign up to save artworks'
        redirectTo: "#{@model.href()}/save"
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
