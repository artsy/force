_           = require 'underscore'
Backbone    = require 'backbone'
mediator    = require '../../lib/mediator.coffee'
analytics   = require '../../lib/analytics.coffee'

module.exports = class SaveButton extends Backbone.View
  events:
    'click' : 'toggle'

  initialize: (options) ->
    return unless options.saved

    { @saved, @notes } = options

    @listenTo @saved, "add:#{@model.id}", @change
    @listenTo @saved, "remove:#{@model.id}", @change

    @analyticsSaveMessage     = options.analyticsSaveMessage or @defaultAnalyticsMessage('Saved')
    @analyticsUnsaveMessage   = options.analyticsUnsaveMessage or @defaultAnalyticsMessage('Unsaved')

    @change()

  defaultAnalyticsMessage: (action) ->
    "#{action} artwork"

  change: ->
    state = if @model.isSaved @saved then 'saved' else 'unsaved'
    @$el.attr 'data-state', state

  toggle: (e) ->
    unless @saved
      mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to save artworks' }
      return false

    if @model.isSaved @saved
      @saved.unsaveArtwork @model.id
      analytics.track.click @analyticsUnsaveMessage, label: analytics.modelNameAndIdToLabel('artwork', @model.get('id'))
    else
      @saved.saveArtwork @model.id, notes: (@notes or @analyticsSaveMessage)
      analytics.track.click @analyticsSaveMessage, label: analytics.modelNameAndIdToLabel('artwork', @model.get('id'))
      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500

    false
