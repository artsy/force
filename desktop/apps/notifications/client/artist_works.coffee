_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../../../models/artist'
Artworks = require '../../../collections/artworks'
ArtworkColumnsView = require '../../../components/artwork_columns/view'
artistHeaderTemplate = -> require('../templates/artist_header.jade') arguments...

module.exports = class ArtistWorksView extends Backbone.View

  events:
    'click .artist-clear' : 'clearArtistWorks'

  initialize: ({@filterState}) ->
    @$artistHeader = @$('.notifications-artist-sub-header')
    @$artistFeed = @$('#notifications-artist-feed')

    @filterState.on 'change', @fetchAndRender

  fetchAndRender: =>
    return unless @filterState.get('artist')
    return unless @filterState.get('loading')

    @setupPreFetch()
    @fetch()

  setupPreFetch: ->
    $(window).on 'scroll.notifications.artworks', _.throttle(@infiniteScroll, 150)
    @artist = new Artist id: @filterState.get 'artist'
    @artworks = new Artworks
    @columnsView = new ArtworkColumnsView
      el: @$artistFeed
      collection: @artworks
      artworkSize: 'large'
      numberOfColumns: 3
      gutterWidth: 40
      context_page: 'Works for you page'
    @page = 1
    @forSaleArtist = if @filterState.get('forSale') then 'for_sale' else ''

  fetch: ->
    return if @isFetching
    @isFetching = true
    @artist.related().artworks.fetch
      data:
        filter: [@forSaleArtist]
        page: @page
        total_count: true if @page == 1
      success: (coll, resp, options) =>
        if @artist.related().artworks.length == 0
          $(window).off 'scroll.notifications.artworks'
        else
          @showHeader(options.xhr.getResponseHeader('x-total-count')) if @page == 1
          @columnsView.appendArtworks @artist.related().artworks.models

        if @artworks.length == 0
          @filterState.set 'empty', true

        @filterState.set 'loading', false
        @page++
        @isFetching = false

  showHeader: (count) ->
    @$artistHeader.html artistHeaderTemplate
      name: $(".filter-artist[data-artist=#{@filterState.get('artist')}]").children('.filter-artist-name').html()
      count: count
      id: @artist.id
    @$artistHeader.show()

  infiniteScroll: =>
    return if @isFetching
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.artwork-column').last()
    @fetch() unless fold < $lastItem.offset()?.top + $lastItem.height()

  clearArtistWorks: =>
    $('.filter-artist[data-state=selected] .filter-artist-clear').click()
