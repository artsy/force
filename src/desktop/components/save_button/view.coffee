_ = require 'underscore'
Backbone = require 'backbone'
{ modelNameAndIdToLabel } = require '../../lib/analytics_helpers.coffee'
{ openAuthModal } = require '../../lib/openAuthModal'
{ ModalType } = require "../../../v2/Components/Authentication/Types"
{ Intent } = require "@artsy/cohesion"

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
      openAuthModal(ModalType.signup, {
        copy: 'Sign up to save artworks',
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
    }

    if @model.isSaved @saved
      @saved.unsaveArtwork @model.id
      window.analytics.track("Removed Artwork", trackedProperties)
    else
      @saved.saveArtwork @model.id, notes: (@notes or @analyticsSaveMessage)
      window.analytics.track("Saved Artwork", trackedProperties)

      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500

    false
