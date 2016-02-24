_ = require 'underscore'
Backbone = require 'backbone'

template = -> require('./index.jade') arguments...

module.exports = class ColorFilterView extends Backbone.View
  className: 'cf-colors cf-filter'
  events:
    'click h1' : 'setColor'

  initialize: ({ @params, @aggregations }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an aggregations collection' unless @aggregations?

    @listenTo @params, 'change:color', @render
    @listenTo @aggregations, 'reset', @render

  setColor: (e) ->
    $target = $(e.currentTarget)
    @params.set color: $target.data('value'), page: 1

  render: ->
    colors = _.sortBy @aggregations.get('COLOR').get('counts'), (color) -> color.id
    @$el.html template
      colors: colors
      selected: @params.get('color')
