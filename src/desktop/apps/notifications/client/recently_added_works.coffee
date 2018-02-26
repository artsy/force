_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
Q = require 'bluebird-q'
{ API_URL } = sd = require('sharify').data
Notifications = require '../../../collections/notifications.coffee'
Artworks = require '../../../collections/artworks.coffee'
Artist = require '../../../models/artist.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
DateHelpers = require '../../../components/util/date_helpers.coffee'
artistTemplate = -> require('../templates/artist.jade') arguments...
emptyTemplate = -> require('../templates/empty.jade') arguments...

module.exports = class RecentlyAddedWorksView extends Backbone.View
  columnViews: []

  initialize: ({@notifications, @filterState, @following}) ->

    @$feed = @$('#notifications-feed')
    @$pins = @$('#notifications-pins')

    @backfilledArtworks = new Backbone.Collection []
    @unreadNotifications = new Artworks sd.UNREAD_NOTIFICATIONS
    @listenTo @notifications, 'sync', @appendArtworks
    @filterState.on 'change', @render

    @setup()

  setup: ->
    { artist_id } = @params()
    return unless artist_id?

    @pinnedArtist = new Artist id: artist_id
    @pinnedArtworks = @pinnedArtist.related().artworks

    $.when.apply(null, [
      @pinnedArtist.fetch()
      @pinnedArtworks.fetch(data: sort: '-published_at', size: 6 )
    ])?.then =>
      $container = @renderContainerTemplate(
        @pinnedArtist,
        @pinnedArtworks,
        @containsNewArtwork(@pinnedArtworks)
      )
      @$pins.html $container
      @renderColumns $container.find('.notifications-published-artworks'), @pinnedArtworks

  params: ->
    qs.parse(location.search.substring(1))

  appendArtworks: ->
    if @notifications.state.currentPage is 1
      @resetFeed()
    else
      @renderMethod = 'append'

    for artistName, publishedArtworks of @notifications.groupedByArtist()
      artworks = new Artworks @filterForPinned(publishedArtworks)
      continue unless artworks.length
      artist = new Artist artworks.first().get('artist')

      @$feed[@renderMethod] $container = @renderContainerTemplate(artist, artworks, @containsNewArtwork(artworks))
      # Only reset the DOM on the first iteration
      @renderMethod = 'append'

      @columnViews.push @renderColumns($container.find('.notifications-published-artworks'), artworks)

    Waypoint.refreshAll()

  containsNewArtwork: (artworks) =>
    @filterState.get('initialLoad') and _.intersection(@unreadNotifications.pluck('id'), artworks.pluck('id')).length > 0

  filterForPinned: (artworks) ->
    return artworks unless @pinnedArtworks?.length
    @pinnedIds ?= @pinnedArtworks.pluck 'id'
    _.reject artworks, (artwork) =>
      _.contains @pinnedIds, artwork.id

  renderContainerTemplate: (artist, artworks, unread) ->
    $ artistTemplate
      artist: artist
      publishedAt: @publishedAt(artworks)
      count: artworks.length
      unread: unread

  publishedAt: (artworks) ->
    if (timestamps = _.map _.compact(artworks.pluck('published_changed_at')), Date.parse).length
      DateHelpers.formatDate _.max(timestamps)

  renderColumns: ($el, artworks) ->
    new ArtworkColumnsView
      el: $el
      collection: artworks
      artworkSize: 'large'
      numberOfColumns: 3
      gutterWidth: 40
      allowDuplicates: true
      totalWidth: 900
      context_page: 'Works for you page'

  nextPage: =>
    @notifications.getNextPage(
      data: for_sale: @filterState.get('forSale')
    )?.then (response) ->
      unless response.length
        Waypoint.destroyAll()
        $('#notifications-feed').addClass 'end-of-content'

  isEmpty: ->
    !@notifications.length and !@pinnedArtworks?.length

  checkIfEmpty: =>
    @backfillWorks() if @isEmpty()

  backfillWorks: =>
    @forSaleFormatted = if @filterState.get('forSale') then 'for_sale' else ''
    Q.all(
      @following.models.map (follow) =>
        new Artist(id: follow.get('artist').id).fetch()
    ).then (artists) =>
      Q.all(
        artists.map (artist) =>
          new Artist(artist).related().artworks.fetch
            url: "#{API_URL}/api/v1/artist/#{artist.id}/artworks"
            data:
              filter: [@forSaleFormatted]
              sort: '-published_at'
              size: 10
              published: true
      ).then (artworks) =>
        if artworks.length
          @notifications.add _.sortBy(_.flatten(artworks, true), (a) -> a.published_at ).reverse()
          @notifications.trigger 'sync'
          $('#notifications-feed').addClass 'end-of-content'
        @filterState.set('empty', true) if @isEmpty()

  attachScrollHandler: ->
    @$feed.waypoint (direction) =>
      @nextPage() if direction is 'down'
    , { offset: 'bottom-in-view' }

  resetFeed: ->
    # Remove any existing column views
    _.invoke @columnViews, 'remove'
    # Reset the DOM
    @renderMethod = 'html'
    @columnViews = []
    $('#notifications-feed').html ''
    # Reset the waypoints
    Waypoint.destroyAll()
    @attachScrollHandler()

  render: =>
    return if @filterState.get 'artist'
    return unless @filterState.get 'loading'
    @$pins.hide() if !@filterState.get('initialLoad')
    @notifications.state.currentPage = 1
    @notifications.getFirstPage(
      data: for_sale: @filterState.get('forSale')
      success: =>
        @filterState.set('loading', false)
    )?.then @checkIfEmpty
