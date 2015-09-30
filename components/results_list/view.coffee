Backbone = require 'backbone'
ResultsView = require './views/results.coffee'

module.exports = class ResultsListView extends Backbone.View
  initialize: ({ @typeahead }) ->
    throw new Error 'Requires typeahead' unless @typeahead?

    @collection = new Backbone.Collection
    @results = new ResultsView collection: @collection

    @listenTo @collection, 'reset add remove', @syncExclusions
    @listenTo @collection, 'all', @trigger
    @listenTo @typeahead, 'selected', @select

  select: (suggestions) ->
    @collection.add suggestions

  reset: (suggestions) ->
    @collection.reset suggestions

  syncExclusions: ->
    @typeahead.selected = @collection.pluck 'id'

  render: ->
    @$el.html [
      @typeahead.render().$el
      @results.render().$el
    ]
    this

  remove: ->
    @typeahead.remove()
    @results.remove()
    super
