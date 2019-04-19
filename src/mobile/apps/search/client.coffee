bootstrap = require '../../components/layout/bootstrap.coffee'
_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artwork = require '../../models/artwork.coffee'
splitTest = require '../../../desktop/components/split_test/index.coffee'

resolvedImage = -> require('./templates/image.jade') arguments...

module.exports.SearchResultsView = class SearchResultsView extends Backbone.View

  el: '#search-page'

  initialize: (options) ->
    if options.results
      for result in options.results
        if result.display_model is 'artwork'
          @refreshRenderArtworks result

    splitTest('new_search_page').view()

  refreshRenderArtworks: (result) ->
    artwork = new Artwork(id: result.id)
    artwork.fetch
      success: ->
        @$(".search-result[data-id='#{result.id}'] .search-result-thumbnail-fallback").html resolvedImage(result: artwork)

module.exports.init = ->
  bootstrap()
  new SearchResultsView
    results: sd.RESULTS
