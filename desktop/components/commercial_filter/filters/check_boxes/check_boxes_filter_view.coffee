_ = require 'underscore'
Backbone = require 'backbone'
{ numberFormat } = require 'underscore.string'

template = -> require('./index.jade') arguments...

module.exports = class CheckBoxesFilterView extends Backbone.View
  className: "cf-#{@itemType} cf-filter"
  events:
    "change [type='checkbox']" : 'toggleItem'

  initialize: ({ @itemType, @paramName, @params, @aggregations }) ->
    throw new Error 'Requires an item type' unless @itemType?
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an aggregations collection' unless @aggregations?

    @listenTo @params, "change:#{@paramName}", @render
    @listenTo @aggregations, 'reset', @render

  itemAggregation: ->
    @itemType.toUpperCase();

  aggregatedItems: ->
    @aggregations.get(@itemAggregation())

  hasResults: (counts, id) ->
    _.any counts, (count) -> count.id is id

  findAggregation: (counts, id) ->
    _.find counts, (count) -> count.id is id

  toggleItem: (e) ->
    selectedItem = $(e.currentTarget).attr('id')
    @params.set page: 1, silent: true, "#{@paramName}": @resolveItems(selectedItem)

  resolveItems: (selectedItem) ->
    if selectedItem is "#{@itemType}-all"
      []
    else if _.contains(@params.get(@paramName), selectedItem)
      _.without(@params.get(@paramName), selectedItem)
    else
      @params.get(@paramName).concat(selectedItem)

  render: ->
    @$el.html template
      counts: @aggregatedItems()?.get('counts')
      selected: @params.get(@paramName)
      hasResults: @hasResults
      findAggregation: @findAggregation
      numberFormat: numberFormat
      itemType: @itemType
      _: _
