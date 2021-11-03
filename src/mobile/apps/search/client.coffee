bootstrap = require '../../components/layout/bootstrap'
Backbone = require 'backbone'
sd = require('sharify').data
{ Artwork } = require '../../models/artwork'

resolvedImage = -> require('./templates/image.jade') arguments...

module.exports.SearchResultsView = class SearchResultsView extends Backbone.View

  el: '#search-page'

  initialize: (options) ->
    if options.results
      for result in options.results
        if result.display_model is 'artwork'
          @refreshRenderArtworks result

  refreshRenderArtworks: (result) ->
    artwork = new Artwork(id: result.id)
    artwork.fetch
      success: ->
        @$(".search-result[data-id='#{result.id}'] .search-result-thumbnail-fallback").html resolvedImage(result: artwork)

module.exports.init = ->
  bootstrap()
  new SearchResultsView
    results: sd.RESULTS
