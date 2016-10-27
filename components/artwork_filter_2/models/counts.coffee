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
  #
  # ie:
  #
  # @totals =
  #   for_sale: 9
  #   all: 16
  #
  # @aggregations =
  #   for_sale:
  #     medium: [{
  #       { id: 'painting'
  #         count: 2
  #         name: 'Painting'
  #       }]
  #     ...
  #   all:
  #     medium: [{
  #       id: 'painting'
  #       count: 7
  #       name: 'Painting'
  #     }]
  #     ...

  fetch: (artist_id) =>
    metaphysics
      query: query
      variables: { artist_id, @aggregations }
    .then (data) =>
      @mapData data
      @setCurrentCounts()

  mapData: ({ all, for_sale }) ->
    @totals =
      for_sale: for_sale.total
      all: all.total

    @aggregations = _.reduce all.aggregations, (memo, { slice, counts }) ->
      paramKey = _.find(aggregationsMap, slice: slice)['param']
      memo.all[paramKey] = counts
      forSaleCounts = _.find(for_sale.aggregations, { slice }).counts
      memo.for_sale[paramKey] = _.map counts, (count) ->
        if (forSaleCount = _.find(forSaleCounts, id: count.id))
          forSaleCount
        else
          _.extend {}, count, count: 0
      memo
    , { for_sale: {}, all: {} }

  setCurrentCounts: ->
    # Set attributes representing for sale and not for sale artworks
    # meeting the current params selection
    #
    # ie:
    #
    # @params
    # > medium: 'painting'
    #
    # @set
    #   for_sale: 2
    #   all: 7

    paramValue = undefined
    paramKey = _.find @params.filterParamKeys, (key) =>
      paramValue = @params.get key
      paramValue?

    if paramKey?
      @set
        for_sale: _.find(@aggregations.for_sale[paramKey], id: paramValue).count
        all: _.find(@aggregations.all[paramKey], id: paramValue).count
    else
      @set @totals
