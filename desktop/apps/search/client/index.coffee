analyticsHooks = require '../../../lib/analytics_hooks.coffee'
_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artist = require '../../../models/artist.coffee'
Gene = require '../../../models/gene.coffee'
Artwork = require '../../../models/artwork.coffee'
{ crop } = require '../../../components/resizer/index.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'

imageTemplate = -> require('../templates/image-template.jade') arguments...
resolvedImage = -> require('../templates/image.jade') arguments...

module.exports.SearchResultsView = class SearchResultsView extends Backbone.View

  el: '#search-page'

  events:
    'click .search-result': 'trackSelectResult'

  initialize: (options) ->
    if options.results
      for result in options.results
        if result.display_model is 'Artist'
          @initializeArtistRow result
        else if result.display_model is 'Category'
          @initializeGeneRow result
        else if result.display_model is 'Artwork'
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
        artwork.set 'image_url', artwork.imageUrl()
        artwork.imageUrl = ->
          url = artwork.get('image_url')
          crop url, width: 70, height: 70
        @$(".search-result[data-id='#{result.id}'] .search-result-thumbnail-fallback").html resolvedImage(result: artwork)

  trackSelectResult: (e) ->
    e.preventDefault()
    term = $('#main-layout-search-bar-input').val()
    $searchResult = $(e.currentTarget)
    analyticsHooks.trigger 'search-page:item:click',
      query: term
      item_number: $searchResult.parent().children().index($searchResult)
      item_type: $searchResult.attr('class').replace('search-result ', '')
      destination_path: "#{sd.APP_URL}#{$searchResult.attr('href')}"

module.exports.init = ->
  new SearchResultsView
    results: sd.RESULTS
