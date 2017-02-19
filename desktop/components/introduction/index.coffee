Backbone = require 'backbone'
Introduction = require './model.coffee'

module.exports = class IntroductionView extends Backbone.View
  initialize: ->
    @model = new Introduction
    @listenTo @model, 'request', @syncing
    @listenTo @model, 'sync', @render
    @update()

  syncing: ->
    @$el.append $('<div>').attr('class', 'loading-spinner')

  update: ->
    return if @isUpdating
    @isUpdating = true
    @model.save null,
      success: => @isUpdating = false
      error: => @isUpdating = false

  render: ->
    @$el.text @model.get('introduction')
    this
