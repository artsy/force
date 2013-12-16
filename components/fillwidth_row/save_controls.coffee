_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
sd       = require('sharify').data

module.exports = class SaveControls extends Backbone.View

  analyticsRemoveMessage: "Removed artwork from collection, via result rows"
  analyticsSaveMessage: "Added artwork to collection, via result rows"

  initialize: ->
    throw 'You must pass an el' unless @el?
    throw 'You must pass a model' unless @model?

    # Listen to save changes for this work
    @defaultArtworkCollection = window.currentUser.defaultArtworkCollection()
    if @defaultArtworkCollection
      @listenTo @defaultArtworkCollection, "add:#{@model.get('id')}", @onArtworkSaveChange
      @listenTo @defaultArtworkCollection, "remove:#{@model.get('id')}", @onArtworkSaveChange
      @onArtworkSaveChange()

  onArtworkSaveChange: ->
    if @model.isSaved()
      @$el.removeClass('unsaved').addClass('saved')
      @$('.label').text('Saved')
    else
      @$el.removeClass('saved').addClass('unsaved')
      @$('.label').text('Favorite')

  events:
    'click .save' : 'saveClick'

  saveClick: (event) ->
    unless window.currentUser
      mediator.trigger 'open:auth', { mode: 'login' }
      return false

    @$el.removeClass('committed')

    if @model.isSaved()
      # Analytics.click @analyticsRemoveMessage, @model
      @defaultArtworkCollection.unsaveArtwork @model.get('id'),
        success: => @$el.addClass('committed')
        error: => @$el.removeClass('unsaved').addClass('saved')
    else
      # Analytics.click @analyticsSaveMessage, @model
      @defaultArtworkCollection.saveArtwork @model.get('id'),
        success: => @$el.addClass('committed')
        error: => @$el.removeClass('saved').addClass('unsaved')
      @$el.addClass('clicked')
      setTimeout =>
        @$el.removeClass('clicked')
      , 1500
    false
