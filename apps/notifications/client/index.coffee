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
SearchBarView = require '../../../components/search_bar/view.coffee'
artistTemplate = -> require('../templates/artist.jade') arguments...
emptyTemplate = -> require('../templates/empty.jade') arguments...
filterArtistTemplate = -> require('../templates/filter_artist.jade') arguments...

module.exports.NotificationsView = class NotificationsView extends Backbone.View
  columnViews: []

  events:
    'click #for-sale': 'toggleForSale'
    'click .filter-artist-name' : 'toggleArtist'
    'click .filter-artist-clear' : 'clearArtistWorks'

  initialize: ->
    @cacheSelectors()

    @user = CurrentUser.orNull()
    @notifications = new Notifications null, since: 30, type: 'ArtworkPublished'

    @listenTo @notifications, 'request', @indicateLoading
    @listenTo @notifications, 'sync', @appendArtworks
    @listenTo @notifications, 'sync', @concealLoading

    @setupJumpView()
    @following = new Following [], kind: 'artist'
    @setupSearch()

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
    @$works = @$('#notifications-works')
    @$pins = @$('#notifications-pins')
    @$filternav = @$('#notifications-filter')
    @$artistworks = @$('#notifications-artist-works')
    @$artistSpinner = @$('#notifications-artist-works-spinner')
    @$selectedArtist = @$('.filter-artist[data-state=selected]')

  scrollToPins: ->
    @jump.scrollToPosition @pinsOffset ?= @$pins.offset().top - $('#main-layout-header').height()

  scrollToArtistWorks: ->
    @jump.scrollToPosition @artistworksOffset ?= @$artistworks.offset().top

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
    @$selectedArtist.attr 'data-state', null
    @$selectedArtist = @$(e.currentTarget).parent()
    @artist = new Artist id: @$selectedArtist.attr('data-artist')
    @$selectedArtist.attr 'data-state', 'selected'
    @$works.hide()
    @$artistworks.hide()
    @$artistSpinner.show()
    @scrollToArtistWorks()
    @artist.related().artworks.fetchUntilEnd
      success: =>
        @$artistSpinner.hide()
        if @artist.related().artworks.length
          @renderColumns @$artistworks, @artist.related().artworks
        else
          @$artistworks.html emptyTemplate()
        @$artistworks.show()

  isEmpty: ->
    !@notifications.length and (!@pinnedArtworks?.length is !@forSale)

  checkIfEmpty: =>
    @$feed.html(emptyTemplate()) if @isEmpty()

  clearArtistWorks: (e) ->
    @$selectedArtist.attr 'data-state', null
    @$artistworks.hide()
    @$works.show()

  setupSearch: (options = {}) ->
    @searchBarView = new SearchBarView
      mode: 'artists'
      el: @$('#notifications-search-container')
      $input: @$searchInput ?= @$('#notifications-search')
      autoselect: true
      displayKind: false

    @listenTo @searchBarView, 'search:selected', @follow

  follow: (e, model) ->
    @searchBarView?.clear()
    @$('.notifications-artist-list').prepend filterArtistTemplate
      artist:
        id: model.get('id')
        name: model.get('name')
        published_artworks_count: model.get('published_artworks_count')
    @following.follow model.get('id')

module.exports.init = ->
  new NotificationsView el: $('body')
  scrollFrame '#notifications-feed a'
  require './analytics.coffee'
