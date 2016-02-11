{ defaults, extend, pick } = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'

module.exports = class Filter
  extend @prototype, Backbone.Events
  defaults:
    stuckParam: null
    params:
      size: 18
      page: 1
      for_sale: true
      color: null
      medium: null
      aggregations: ['TOTAL', 'FOR_SALE', 'COLOR', 'MEDIUM']

  constructor: (options) ->
    @options = defaults @defaults, options

  query: ->
    query = """
      query filterArtworks(
        $aggregations: [ArtworkAggregation]!,
        $for_sale: Boolean,
        $size: Int,
        $page: Int,
        $color: String,
        $price_range: String,
        $gene_id: String,
        $medium: String
      ){
        filter_artworks(
          aggregations: $aggregations,
          for_sale: $for_sale,
          size: $size,
          page: $page,
          color: $color,
          price_range: $price_range,
          gene_id: $gene_id,
          medium: $medium
        ){
          total
          aggregations {
            ... aggregations
          }
          hits {
            ... artwork
          }
        }
      }
      #{require '../queries/artwork.coffee'}
      #{require '../queries/aggregations.coffee'}
    """

  params: ->
    pick @options.params, 'aggregations', 'for_sale', 'size', 'page'

  fetch: ->
    Q.promise (resolve, reject) =>
      metaphysics query: @query(), variables: @params()
        .then ({ filter_artworks }) =>
          @artworks = new Artworks filter_artworks.hits
          @aggregations = new Backbone.Model filter_artworks.aggregations
          resolve @
        .catch (error) ->
          reject error
