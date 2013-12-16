_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
sd       = require('sharify').data

module.exports = class SaveControls extends Backbone.View

  analyticsRemoveMessage: "Removed artwork from collection, via result rows"
  analyticsSaveMessage: "Added artwork to collection, via result rows"

  initialize: (options) ->
    throw 'You must pass an el' unless @el?
    throw 'You must pass a model' unless @model?
    return unless options.artworkCollection
    { @artworkCollection } = options

    # Listen to save changes for this work
    if @artworkCollection
      @listenTo @artworkCollection, "add:#{@model.get('id')}", @onArtworkSaveChange
      @listenTo @artworkCollection, "remove:#{@model.get('id')}", @onArtworkSaveChange
      @onArtworkSaveChange()

  onArtworkSaveChange: ->
    if @model.isSaved @artworkCollection
      @$el.removeClass('overlay-artwork-unsaved').addClass('overlay-artwork-saved')
      @$('.label').text('Saved')
    else
      @$el.removeClass('overlay-artwork-saved').addClass('overlay-artwork-unsaved')
      @$('.label').text('Favorite')

  events:
    'click .overlay-artwork-save' : 'saveClick'

  saveClick: (event) =>
    unless @artworkCollection
      mediator.trigger 'open:auth', { mode: 'login' }
      return false

    @$el.removeClass('committed')

    if @model.isSaved @artworkCollection
      # Analytics.click @analyticsRemoveMessage, @model
      @artworkCollection.unsaveArtwork @model.get('id'),
        success: => @$el.addClass('committed')
        error: => @$el.removeClass('unsaved').addClass('saved')
    else
      # Analytics.click @analyticsSaveMessage, @model
      @artworkCollection.saveArtwork @model.get('id'),
        success: => @$el.addClass('committed')
        error: => @$el.removeClass('saved').addClass('unsaved')
      @$el.addClass('overlay-artwork-clicked')
      setTimeout =>
        @$el.removeClass('overlay-artwork-clicked')
      , 1500
    false
