_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
{ API_URL } = require('sharify').data

module.exports = class FilterArtworks extends Artworks
  url: "#{API_URL}/api/v1/filter/artworks"

  parse: (data) ->
    @counts = @prepareCounts data.aggregations
    data.hits

  prepareCounts: (aggregations)->
    # _.map destroys the keys, hence the iteration
    for k, v of aggregations
      aggregations[k] = @prepareAggregate v, k

    aggregations

  prepareAggregate: (aggregate, name) ->

    # maps the sorted order but keeps the keys
    mapKeys = (keys, object)->
      newMap = {}
      _.each keys, (key)->
        newMap[key] = object[key]
      newMap

    aggregateMap =
      # sorts the price_range from lowest to highest
      'price_range': (aggregate) ->
        keys = _.sortBy _.keys(aggregate), (key) ->
          return -1 if key is "*-*"
          [from, to] = key.split('-')
          return 0 if from is "*"
          return parseInt from
        mapKeys keys, aggregate
      'dimension_range': (aggregate) -> aggregate
      # sorts medium alphabetically
      'medium': (aggregate) ->
        keys = _.sortBy _.keys(aggregate), (key) -> key
        mapKeys keys, aggregate
      'total': (aggregate) -> aggregate

    aggregateMap[name]? aggregate
