_ = require 'underscore'
qs = require 'qs'
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
{ API_URL } = require('sharify').data

module.exports = class FilterArtworks extends Artworks
  defaults:
    mapppedParams:
      related_gene: 'gene_id'
      gallery: 'partner_id'
      institution: 'partner_id'

  url: "#{API_URL}/api/v1/filter/artworks"

  initialize: ( models, options = {} ) ->
    { @mapppedParams } = _.defaults options, @defaults
    super

  sync: (method, collection, options) =>
    for k, v of @mapppedParams
      if val = options.data?[k]
        options.data[v] = val
        delete options.data[k]
    options.data = decodeURIComponent qs.stringify(options.data, { arrayFormat: 'brackets' })
    super

  parse: (data) ->
    @counts = @prepareCounts(data.aggregations) if data.aggregations
    data.hits

  prepareCounts: (aggregations)->
    # _.map destroys the keys, hence the iteration
    for k, v of aggregations
      aggregations[k] = @prepareAggregate v, k

    # remove this inferior for sale filter now, pls
    delete aggregations['price_range']?['*-*']

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
      'period': (aggregate) ->
        for k, v of aggregate
          aggregate[k].name = "#{aggregate[k].name}s"
        aggregate
      'gallery': (aggregate) -> aggregate
      'institution': (aggregate) -> aggregate
      'for_sale': (aggregate) -> aggregate

    aggregateMap[name]? aggregate
