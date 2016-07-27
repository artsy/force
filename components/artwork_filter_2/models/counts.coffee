Backbone = require 'backbone'
_ = require 'underscore'
metaphysics = require '../../../lib/metaphysics.coffee'
aggregationsMap = require '../aggregations_map.coffee'
query = """
  query filterArtworks($artist_id: String!) {
    all: filter_artworks(artist_id:$artist_id, aggregations: [TOTAL, GALLERY, PERIOD, MEDIUM]){
      ... aggregations
    }
    for_sale: filter_artworks(artist_id:$artist_id, for_sale:true, aggregations: [TOTAL, GALLERY, PERIOD, MEDIUM]){
      ... aggregations
    }
  }

  fragment aggregations on FilterArtworks {
    total
    aggregations {
      slice
      counts {
        id
        name
        count
      }
    }
  }
"""

module.exports = class Counts extends Backbone.Model
  initialize: ({ params }) ->
    @listenToOnce params, 'firstSet', @fetch

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
    { totals, aggregations }

  fetch: (artistID) =>
    metaphysics
      query: query
      variables: artist_id: artistID
    .then (data) =>
      @set @mapData(data)

  getTotal: (forSale, params) ->
    key = if forSale then 'for_sale' else 'all'
    paramKey = params.currentFilterParam()
    return @get('totals')?[key] if not paramKey?
    slice = _.find(aggregationsMap, param: paramKey).slice
    _.find(@get('aggregations')[key][slice], id: params.get(paramKey)).count

  allTotal: (params) -> @getTotal false, params

  forSaleTotal: (params) -> @getTotal true, params

