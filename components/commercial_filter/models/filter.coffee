Backbone = require 'backbone'
Q = require 'bluebird-q'
Aggregations = require '../collections/aggregations.coffee'
Artworks = require '../../../collections/artworks.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'

module.exports = class Filter extends Backbone.Model
  defaults:
    loading: false

  initialize: ({ @params } = {}) ->
    throw new Error 'Requires a params model' unless @params?
    @artworks = new Artworks()
    @aggregations = new Aggregations()

    @params.on 'change', @fetch, @

  query: ->
    query = """
      query filterArtworks(
        $aggregations: [ArtworkAggregation]!,
        $for_sale: Boolean,
        $height: String,
        $width: String
        $page: Int,
        $size: Int,
        $color: String,
        $price_range: String,
        $gene_id: String,
        $medium: String,
        $sort: String,
      ){
        filter_artworks(
          aggregations: $aggregations,
          for_sale: $for_sale,
          page: $page,
          size: $size,
          width: $width,
          height: $height,
          color: $color,
          price_range: $price_range,
          gene_id: $gene_id,
          medium: $medium,
          sort: $sort
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

  fetch: ->
    @set loading: true
    Q.promise (resolve, reject) =>
      metaphysics query: @query(), variables: @params.current()
        .then ({ filter_artworks }) =>
          if filter_artworks.hits.length
            @artworks.reset filter_artworks.hits
          else
            @artworks.trigger 'zero:results', false
          @set loading: false
          @set total: filter_artworks.total
          @aggregations.reset filter_artworks.aggregations
          resolve @
        .catch (error) ->
          reject error
