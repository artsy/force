_ = require 'underscore'
moment = require 'moment'
Backbone = require 'backbone'
Filter = require './model'
filtersTemplate = -> require('./templates/filters.jade') arguments...
itemsTemplate = -> require('./templates/items.jade') arguments...
headerTemplate = -> require('./templates/header.jade') arguments...
itemTemplate = -> require('./templates/item.jade') arguments...

module.exports = class FilterableListView extends Backbone.View
  filtersTemplate: -> filtersTemplate arguments...
  itemsTemplate: -> itemsTemplate arguments...
  headerTemplate: -> headerTemplate arguments...
  itemTemplate: -> itemTemplate arguments...

  events:
    'click .filterable-list-filter': 'applyFilter'

  initialize: (options) ->
    @filter = new Filter options
    @listenTo @filter, 'change:active', @render
    @listenTo @collection, 'sync', @render

  applyFilter: (e) ->
    @filter.set 'active', $(e.currentTarget).data('filter')

  itemDisplayable: (item) =>
    @filter.get('active') is @filter.defaults.active or
    item.get(@filter.get('filter_by')) is @filter.get('active')

  # Default assumption is that the group_by attribute is a timestamp
  itemSortBy: (item) =>
    value = item.get(@filter.get('group_by'))
    timestamp = -(moment(value))# if value
    if isNaN(timestamp) or not (value?)
      Infinity # Send to end
    else
      timestamp

  # Default assumption is that the group_by attribute is a timestamp
  itemGroupBy: (item) =>
    value = item.get(@filter.get('group_by'))
    if value then -(moment(value).format('YYYY')) else 'Unknown'

  processHeading: (heading) ->
    year = Math.abs heading
    if isNaN(year) then 'Unknown' else year

  itemRender: (item) =>
    @itemTemplate(item: item, filter_by: @filter.get('filter_by'))

  flatItemsRender: ->
    @filter.get('collection').chain()
      .filter(@itemDisplayable)
      .map(@itemRender).value().join ''

  groupedItemsRender: ->
    @filter.get('collection').chain()
      .filter(@itemDisplayable)
      .sortBy(@itemSortBy)
      .groupBy(@itemGroupBy)
      .map((items, heading) =>
        @headerTemplate(heading: @processHeading(heading)) +
        _.map(items, @itemRender).join ''
      ).value().join ''

  itemsRender: ->
    if @filter.has('group_by') then @groupedItemsRender() else @flatItemsRender()

  template: ->
    return unless @collection.length
    [
      $(@filtersTemplate(filter: @filter))
      $(@itemsTemplate()).html(@itemsRender())
    ]

  render: ->
    @$el.html @template()
    this
