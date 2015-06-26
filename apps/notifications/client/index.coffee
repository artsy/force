_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
Notifications = require '../../../collections/notifications.coffee'
Following = require '../../../components/follow_button/collection.coffee'
Artworks = require '../../../collections/artworks.coffee'
Artists = require '../../../collections/artists.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artist = require '../../../models/artist.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
DateHelpers = require '../../../components/util/date_helpers.coffee'
JumpView = require '../../../components/jump/view.coffee'
artistTemplate = -> require('../templates/artist.jade') arguments...
emptyTemplate = -> require('../templates/empty.jade') arguments...
artistFilterTemplate = -> require('../templates/artist_filter.jade') arguments...

module.exports.NotificationsView = class NotificationsView extends Backbone.View
  columnViews: []

  events:
    'click #for-sale': 'toggleForSale'
    'click .filter-artist' : 'toggleArtist'

  initialize: ->
    @cacheSelectors()

    @user = CurrentUser.orNull()
    @notifications = new Notifications null, since: 30, type: 'ArtworkPublished'
    @fetchAndRenderFollowingArtists()

    @listenTo @notifications, 'request', @indicateLoading
    @listenTo @notifications, 'sync', @appendArtworks
    @listenTo @notifications, 'sync', @concealLoading

    @setupJumpView()

    @setup =>
      @notifications.getFirstPage()?.then @checkIfEmpty

  attachScrollHandler: ->
    @$feed.waypoint (direction) =>
      @nextPage() if direction is 'down'
    , { offset: 'bottom-in-view' }

  params: ->
    qs.parse(location.search.substring(1))

  setupJumpView: ->
    @jump = new JumpView threshold: $(window).height(), direction: 'bottom'
    @$el.append @jump.$el

  indicateLoading: ->
    @$spinner.show()

  concealLoading: ->
    @$spinner.hide()

  cacheSelectors: ->
    @$spinner = @$('#notifications-feed-spinner')
    @$feed = @$('#notifications-feed')
    @$pins = @$('#notifications-pins')
    @$filternav = @$('#notifications-filter')

  scrollToPins: ->
    @jump.scrollToPosition @pinsOffset ?= @$pins.offset().top - $('#main-layout-header').height()

  setup: (cb) ->
    { artist_id } = @params()

    return cb() unless artist_id?

    @pinnedArtist = new Artist id: artist_id
    @pinnedArtworks = @pinnedArtist.related().artworks

    $.when.apply(null, [
      @pinnedArtist.fetch()
      @pinnedArtworks.fetch(data: size: 6, sort: '-published_at')
    ])?.then =>
      @$pins.html $container = @renderContainerTemplate(@pinnedArtist, @pinnedArtworks)
      @renderColumns $container.find('.notifications-published-artworks'), @pinnedArtworks
      @scrollToPins()
      cb()
    , cb # Ignore errors

  resetFeed: ->
    # Remove any existing column views
    _.invoke @columnViews, 'remove'
    # Reset the DOM
    @renderMethod = 'html'
    @columnViews = []
    # Reset the waypoints
    $.waypoints 'destroy'
    @attachScrollHandler()

  appendArtworks: ->
    if @notifications.state.currentPage is 1
      @resetFeed()
    else
      @renderMethod = 'append'

    for artistName, publishedArtworks of @notifications.groupedByArtist()
      artworks = new Artworks @filterForPinned(publishedArtworks)
      continue unless artworks.length
      artist = new Artist artworks.first().get('artist')

      @$feed[@renderMethod] $container = @renderContainerTemplate(artist, artworks)
      # Only reset the DOM on the first iteration
      @renderMethod = 'append'

      @columnViews.push @renderColumns($container.find('.notifications-published-artworks'), artworks)

    $.waypoints 'refresh'

  filterForPinned: (artworks) ->
    return artworks unless @pinnedArtworks?.length
    @pinnedIds ?= @pinnedArtworks.pluck 'id'
    _.reject artworks, (artwork) =>
      _.contains @pinnedIds, artwork.id

  renderContainerTemplate: (artist, artworks) ->
    $ artistTemplate
      artist: artist
      publishedAt: @publishedAt(artworks)
      count: artworks.length

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
      maxArtworkHeight: 600

  nextPage: =>
    @notifications.getNextPage()?.then (response) ->
      unless response.length
        $.waypoints 'destroy'

  toggleForSale: (e) ->
    @forSale = $(e.currentTarget).prop('checked')
    @$feed.hide()
    @$pins.hide() # Only relevant on initial load
    @notifications.getFirstPage(
      data: for_sale: @forSale
      success: => @$feed.show()
    )?.then @checkIfEmpty

  toggleArtist: (e) ->
    @artist = new Artist id: $(e.currentTarget).attr('data-artist')
    @$feed.hide()
    @$pins.hide()
    @artist.fetchArtworks
      success: =>
        if @artist.related().artworks.length
          @renderColumns @$('#notifications-works'), @artist.related().artworks
        else
          console.log 'yeah there is nothing here'
          @$('#notifications-works').html(emptyTemplate())

  isEmpty: ->
    !@notifications.length and (!@pinnedArtworks?.length is !@forSale)

  checkIfEmpty: =>
    @$feed.html(emptyTemplate()) if @isEmpty()

  fetchAndRenderFollowingArtists: ->
      url = "#{sd.API_URL}/api/v1/me/follow/artists"
      @followingArtists = new Artists()
      @followingArtists.fetchUntilEnd
        url: url
        success: =>
          if @followingArtists.length
            @$filternav.append artistFilterTemplate(artists: @followingArtists)

module.exports.init = ->
  new NotificationsView el: $('body')
  scrollFrame '#notifications-feed a'
  require './analytics.coffee'
