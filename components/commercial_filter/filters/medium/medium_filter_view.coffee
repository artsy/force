_ = require 'underscore'
Backbone = require 'backbone'

template = -> require('./index.jade') arguments...

module.exports = class MediumFilterView extends Backbone.View
  classNames: 'cf-mediums'
  events:
    'click h1' : 'setMedium'

  initialize: ({ @params, @aggregations }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an aggregations collection' unless @aggregations?

    @listenTo @params, 'change:medium', @render
    @listenTo @aggregations, 'reset', @render

  setMedium: (e) ->
    $target = $(e.currentTarget)
    @params.set 'medium', $target.data('value')

  render: ->
    mediums = _.sortBy @aggregations.get('MEDIUM').get('counts'), (medium) -> medium.id
    @$el.html template
      mediums: mediums
      selected: @params.get('medium')
