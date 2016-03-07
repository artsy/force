_ = require 'underscore'
Backbone = require 'backbone'
mediumMap = require './medium_map.coffee'

template = -> require('./index.jade') arguments...

module.exports = class MediumFilterView extends Backbone.View
  className: 'cf-mediums cf-filter'
  events:
    'click h1' : 'setMedium'

  initialize: ({ @params, @aggregations }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an aggregations collection' unless @aggregations?

    @listenTo @params, 'change:medium', @render
    @listenTo @aggregations, 'reset', @render

  setMedium: (e) ->
    $target = $(e.currentTarget)
    @params.unset 'gene_id', silent: true
    @params.set medium: $target.data('value'), page: 1

  hasResults: (counts, id) ->
    _.any counts, (count) -> count.id is id

  render: ->
    @$el.html template
      counts: @aggregations.get('MEDIUM').get('counts')
      mediums: mediumMap
      selected: @params.get('medium')
      hasResults: @hasResults
