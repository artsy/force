analytics = require '../../../lib/analytics.coffee'
_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artist = require '../../../models/artist.coffee'
Gene = require '../../../models/gene.coffee'
Artwork = require '../../../models/artwork.coffee'

imageTemplate = require '../templates/image-template.jade'
resolvedImage = require '../templates/image.jade'

module.exports.SearchResultsView = class SearchResultsView extends Backbone.View

  el: '#search-page'

  events:
    'click .search-result' : 'trackClick'

  initialize: (options) ->
    if options.results
      for result in options.results
        if result.display_model is 'artist'
          @initializeArtistRow result
        else if result.display_model is 'category'
          @initializeGeneRow result
        else if result.display_model is 'artwork'
          @refreshRenderArtworks result

  initializeArtistRow: (result) ->
    new Artist(id: result.id).fetchArtworks
      data:
        sort: '-iconicity'
        size: 7
        published: true
      success: (artworks) =>
        @renderArtworks artworks, result.id

  initializeGeneRow: (result) ->
    new Gene(id: result.id).fetchArtworks
      data:
        size: 7
        published: true
      success: (artworks) =>
        @renderArtworks artworks, result.id

  renderArtworks: (artworks, id) ->
    imageUrls =
      for artwork in artworks.models
        artwork.defaultImageUrl('tall')
    if imageUrls.length > 0
      @$(".search-result[data-id=#{id}] .search-result-images").html imageTemplate(imageUrls: imageUrls)

  refreshRenderArtworks: (result) ->
    artwork = new Artwork(id: result.id)
    artwork.fetch
      success: ->
        @$(".search-result[data-id=#{result.id}] .search-result-thumbnail-fallback").html resolvedImage(result: artwork)

  trackClick: ->
    analytics.track.click "Selected item from results page", query: $('#main-layout-search-bar-input').val()

module.exports.init = ->
  new SearchResultsView
    results: sd.RESULTS
