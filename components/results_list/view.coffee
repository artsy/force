Backbone = require 'backbone'
ResultsView = require './views/results.coffee'
device = require '../util/device.coffee'

module.exports = class ResultsListView extends Backbone.View
  className: 'results-list-typeahead'

  initialize: ({ @typeahead }) ->
    throw new Error 'Requires typeahead' unless @typeahead?

    @collection = new Backbone.Collection
    @results = new ResultsView collection: @collection

    @listenTo @collection, 'reset add remove', @syncExclusions
    @listenTo @collection, 'all', @trigger
    @listenTo @typeahead, 'selected', @select

    if device.isPhoneLike()
      @listenTo @typeahead, 'focus', ->
        _.delay @focusMobileViewport, 300 # Wait for virtual keyboard, 0.3 seconds
      @listenTo @typeahead, 'selected', @focusMobileViewport

  focusMobileViewport: =>
    top = if @results.collection.length
      @results.$('.js-results-list-item').last().offset().top
    else
      @results.$el.position().top

    $('html, body')
      .animate { scrollTop: top }, 'fast'

  select: (suggestions) ->
    @collection.add suggestions

  reset: (suggestions) ->
    @collection.reset suggestions

  syncExclusions: ->
    @typeahead.selected = @collection.pluck 'id'

  render: ->
    send = if device.isPhoneLike() then 'unshift' else 'push'
    $els = [@typeahead.render().$el]
    $els[send] @results.render().$el
    @$el.html $els
    this

  remove: ->
    @typeahead.remove()
    @results.remove()
    super
