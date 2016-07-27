aggregationsMap = require './aggregations_map.coffee'
Backbone = require 'backbone'
ArtworkFiltersView = require './views/filters_view.coffee'
CountView = require './views/header_count_view.coffee'
SortsView = require './views/header_sorts_view.coffee'
Counts = require './models/counts.coffee'
qs = require 'querystring'

# class Filter extends Backbone.Model
#   defaults:
#     loading: false

#   initialize: ({ @params } = {}) ->
#     throw new Error 'Requires a params model' unless @params?
#     @artworks = new Artworks
#     @params.on 'change', @fetch, @

#   fetch: ->
#     query = """
#     query filterArtworks($artist_id: String!) {
#       filter_artworks(artist_id:$artist_id, aggregations: [GALLERY, MEDIUM, PERIOD]){
#         aggregations{
#           slice
#           counts {
#             id
#             name
#             count
#           }
#         }
#       }
#     }
#     """

#     variables =

#     metaphysics { query, variables }


module.exports = ({ $el, artistID }) ->
  paramsFromUrl = qs.parse(location.search.replace(/^\?/, ''))
  params = new Params paramsFromUrl
  counts = new Counts { params }
  # filter = new Filter params
  new ArtworkFiltersView _.extend el: $el.find('.artwork-filter-criteria'), { counts, params }
  new CountView _.extend el: $el.find('#artwork-section__totals'), { counts, params }
  new SortsView _.extend el: $el.find('#artwork-section__sorts-dropdown'), { params }
  params.trigger 'firstSet', artistID

class Params extends Backbone.Model
  initialize: ->
    @aggregationParamKeys = _.pluck(aggregationsMap, 'param')

  mappedParams:
    gallery: 'partner_id'

  updateWith: (key, value) ->
    if @aggregationParamKeys.includes key
      _.each @aggregationParamKeys, (key) =>
        @unset key, silent: true

    @set key, value

  defaults: ->
    @__defaults__ ?=
      sort: '-partner_updated_at'
      size: 50
      page: 1

  aggregationParams: ->
    @pick @aggregationParamKeys

  currentParams: ->
    @pick @aggregationParamKeys.append ['for_sale', 'sort']

  # Of the mutually exclusive filter params with aggregations
  currentFilterParam: ->
    _.findKey @aggregationParams(), (value, key, object) -> value?





