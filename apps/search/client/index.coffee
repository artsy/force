analyticsHooks = require '../../../../lib/analytics_hooks.coffee'
_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artist = require '../../../models/artist.coffee'
Gene = require '../../../models/gene.coffee'
Artwork = require '../../../models/artwork.coffee'

imageTemplate = -> require('../templates/image-template.jade') arguments...
resolvedImage = -> require('../templates/image.jade') arguments...

module.exports.SearchResultsView = class SearchResultsView extends Backbone.View

  el: '#search-page'

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
    artist = new Artist(id: result.id)
    artist.fetchArtworks
      data:
        sort: '-iconicity'
        size: 7
        published: true
      success: (artworks) =>
        if artworks.length > 0
          @renderArtworks artworks, result.id
        else
          @$("[data-id=#{artist.get 'id'}] .search-result-images").remove()

  initializeGeneRow: (result) ->
    new Gene(id: result.id).fetchArtworks
      data:
        size: 7
        published: true
      success: (artworks) =>
        @renderArtworks artworks, result.id

  renderArtworks: (artworks, id) ->
    imageUrls = for artwork in artworks.models
      artwork.defaultImageUrl('tall')
    if imageUrls.length > 0
      @$(".search-result[data-id=#{id}] .search-result-images").html(
        imageTemplate(imageUrls: imageUrls)
      )

  refreshRenderArtworks: (result) ->
    artwork = new Artwork(id: result.id)
    artwork.fetch
      success: ->
        @$(".search-result[data-id='#{result.id}'] .search-result-thumbnail-fallback").html resolvedImage(result: artwork)

module.exports.init = ->
  new SearchResultsView
    results: sd.RESULTS
