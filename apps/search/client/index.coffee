analytics = require '../../../lib/analytics.coffee'
_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artist = require '../../../models/artist.coffee'
Gene = require '../../../models/gene.coffee'

imageTemplate = require '../image-template.jade'

module.exports.SearchResultsView = class SearchResultsView extends Backbone.View

  el: '#search-page'

  events:
    'click .search-result' : 'trackClick'

  initialize: (options) ->
    for result in options.results
      if result.display_model == 'artist'
        @initializeArtistRow result
      else if result.display_model == 'category'
        @initializeGeneRow result

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

  trackClick: ->
    analytics.track.click "Selected item from results page", query: $('#main-layout-search-bar-input').val()

module.exports.init = ->
  new SearchResultsView
    results: sd.RESULTS
