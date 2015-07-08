_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
emptyTemplate = -> require('../templates/empty.jade') arguments...
artistHeaderTemplate = -> require('../templates/artist_header.jade') arguments...

module.exports = class ArtistWorksView extends Backbone.View

  initialize: ({@filterState, @loadingState}) ->
    @$filternav = @$('#notifications-filter')
    @$artistHeader = @$('.notifications-artist-sub-header')
    @$artistFeed = @$('#notifications-artist-feed')
    @$artistSpinner = @$('#notifications-artist-feed-spinner')
    @$artistworks = @$('#notifications-artist-works')

    @filterState.on 'change', @fetchAndRender

  fetchAndRender: =>
    return unless @filterState.get('artist')
    return unless @filterState.get('loading')

    @artist = new Artist id: @filterState.get 'artist'
    @forSaleArtist = if @filterState.get('forSale') then 'for_sale' else ''
    @artist.related().artworks.fetchUntilEnd
      data:
        filter: [@forSaleArtist]
      success: =>
        if @artist.related().artworks.length
          @renderColumns @$artistFeed, @artist.related().artworks
          @$artistHeader.html artistHeaderTemplate
            name: $(".filter-artist[data-artist=#{@filterState.get('artist')}]").children('.filter-artist-name').html()
            count: @artist.related().artworks.length
            id: @artist.id
          @$artistHeader.show()
        else
          @$artistHeader.hide()
          @$artistFeed.html emptyTemplate()
        @filterState.set 'loading', false

  # attachScrollHandler: ->
  #   @$feed.waypoint (direction) =>
  #     @nextPage() if direction is 'down'
  #   , { offset: 'bottom-in-view' }

  # nextPage: =>
  #   @notifications.getNextPage(
  #     data: for_sale: @filterState.get('forSale')
  #   )?.then (response) ->
  #     unless response.length
  #       $.waypoints 'destroy'

  # appendArtworks: ->
  #   if @notifications.state.currentPage is 1
  #     @resetFeed()
  #   else
  #     @renderMethod = 'append'

  #   for artistName, publishedArtworks of @notifications.groupedByArtist()
  #     artworks = new Artworks @filterForPinned(publishedArtworks)
  #     continue unless artworks.length
  #     artist = new Artist artworks.first().get('artist')

  #     @$feed[@renderMethod] $container = @renderContainerTemplate(artist, artworks)
  #     # Only reset the DOM on the first iteration
  #     @renderMethod = 'append'

  #     @columnViews.push @renderColumns($container.find('.notifications-published-artworks'), artworks)

  #   $.waypoints 'refresh'

  renderColumns: ($el, artworks) ->
    new ArtworkColumnsView
      el: $el
      collection: artworks
      artworkSize: 'large'
      numberOfColumns: 3
      gutterWidth: 40
      allowDuplicates: true
      maxArtworkHeight: 600