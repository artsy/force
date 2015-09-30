Backbone = require 'backbone'
template = -> require('../templates/results.jade') arguments...

module.exports = class ResultsView extends Backbone.View
  className: 'results-list'

  events:
    'click .js-remove': 'drop'

  initialize: ->
    @listenTo @collection, 'reset add remove', @render

  drop: (e) ->
    id = $(e.currentTarget).data 'id'
    @collection.remove id

  render: ->
    @$el.html template
      results: @collection.models
    this
