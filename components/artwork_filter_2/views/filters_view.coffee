Backbone = require 'backbone'
_ = require 'underscore'
aggregationsMap = require '../aggregations_map.coffee'
template = -> require('../templates/filters.jade') arguments...

module.exports = class ArtworkFiltersView extends Backbone.View
  events:
    'click .js-artwork-filter-select' : 'filterSelected'
    'click .js-artwork-filter-toggle' : 'toggleBool'
    'click .js-artwork-filter-remove': 'filterDeselected'

  initialize: ({ @params, @counts }) ->
    @listenToOnce @counts, 'change', @render
    @listenTo @params, 'change:for_sale', @render
    _.each @params.aggregationParamKeys, (param) =>
      @listenTo @params, "change:#{param}", @render

  render: ->
    forSaleTotal = @counts.forSaleTotal @params
    key = if (forSale = @params.get('for_sale')?) then 'for_sale' else 'all'
    aggregations = @counts.get('aggregations')?[key]

    @$el.html template { aggregationsMap, forSaleTotal, aggregations, forSale, @counts, @params }

  toggleBool: (e) ->
    key = ($el = $(e.target)).prop('name')
    value = $el.prop('checked')
    if value
      @params.set key, value
    else
      @params.unset key

  filterSelected: (e) ->
    e.preventDefault()
    key = ($el = $(e.target)).data('key')
    value = $el.attr('data-value')
    @params.updateWith key, value

  filterDeselected: (e) ->
    e.preventDefault()
    key = ($el = $(e.target)).data('key')
    @params.unset key