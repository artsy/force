Backbone = require 'backbone'
_ = require 'underscore'
metaphysics = require '../../../lib/metaphysics.coffee'
aggregationsMap = require '../aggregations_map.coffee'
query = require '../queries/counts.coffee'

module.exports = class Counts extends Backbone.Model
  initialize: ({ @params }) ->
    @listenToOnce @params, 'firstSet', @fetch
    _.each @params.filterParamKeys, (param) =>
      @listenTo @params, "change:#{param}", @setCurrentCounts

  aggregations: ['TOTAL', 'GALLERY', 'INSTITUTION', 'PERIOD', 'MEDIUM']

  # Structures the total counts and aggregations from metaphysics,
  # for both `for_sale` and for all artworks, for easier re-rendering
  mapData: ({ all, for_sale }) ->
    totals =
      for_sale: for_sale.total
      all: all.total

    aggregations = _.reduce all.aggregations, (memo, { slice, counts }) ->
      memo.all[slice] = counts
      forSaleCounts = _.find(for_sale.aggregations, { slice }).counts
      memo.for_sale[slice] = _.map counts, (count) ->
        if (forSaleCount = _.find(forSaleCounts, id: count.id))
          forSaleCount
        else
          _.extend {}, count, count: 0
      memo
    , { for_sale: {}, all: {} }
    @totals = totals
    @aggregations = aggregations

  fetch: (artist_id) =>
    metaphysics
      query: query
      variables: { artist_id, @aggregations }
    .then (data) =>
      @mapData(data)
      @setCurrentCounts()

  count: (forSale) ->
    forSaleKey = if forSale then 'for_sale' else 'all'
    paramKey = _.keys(@params.pick @params.filterParamKeys)[0]
    return @totals?[forSaleKey] if not paramKey?
    slice = _.find(aggregationsMap, param: paramKey)['slice']
    _.find(@aggregations[forSaleKey][slice], id: @params.get(paramKey)).count

  setCurrentCounts: ->
    @set
      all: @count false
      for_sale: @count true


