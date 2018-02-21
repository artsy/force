_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
{ modelNameAndIdToLabel } = require '../../lib/analytics_helpers.coffee'

module.exports = class SaveButton extends Backbone.View
  events:
    'click': 'toggle'

  initialize: (options) ->
    return unless options.saved

    { @saved, @notes, @context_page } = options

    @listenTo @saved, "add:#{@model.id}", @change
    @listenTo @saved, "remove:#{@model.id}", @change

    @analyticsSaveMessage = options.analyticsSaveMessage or @defaultAnalyticsMessage('Saved')
    @analyticsUnsaveMessage = options.analyticsUnsaveMessage or @defaultAnalyticsMessage('Unsaved')

    @change()

  defaultAnalyticsMessage: (action) ->
    "#{action} artwork"

  change: ->
    state = if @model.isSaved @saved then 'saved' else 'unsaved'
    @$el.attr 'data-state', state

  toggle: (e) ->
    unless @saved
      mediator.trigger 'open:auth',
        mode: 'register',
        copy: 'Sign up to save artworks',
        afterSignUpAction: {
          action: 'save',
          objectId: @model.id
        }
      return false

    trackedProperties = {
      entity_id: @model.get '_id'
      entity_slug: @model.get 'id'
      context_page: @context_page
    }

    if @model.isSaved @saved
      @saved.unsaveArtwork @model.id
      analyticsHooks.trigger 'save:remove-artwork', trackedProperties
    else
      @saved.saveArtwork @model.id, notes: (@notes or @analyticsSaveMessage)
      analyticsHooks.trigger 'save:save-artwork', trackedProperties

      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500

    false
