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
    @following = new Following [], kind: 'artist'

    @listenTo @notifications, 'request', @indicateLoading
    @listenTo @notifications, 'sync', @appendArtworks
    @listenTo @notifications, 'sync', @concealLoading

    @setupJumpView()
    @setupSearch()

    @setup =>
      @notifications.getFirstPage()?.then @checkIfEmpty

  attachScrollHandler: ->
    @$feed.waypoint (direction) =>
      @nextPage() if direction is 'down'
    , { offset: 'bottom-in-view' }
    @$artistFeed.waypoint (direction) =>
      @nextArtistPage() if direction is 'down'
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
    @$artistFeed = @$('#notifications-artist-feed')
    @$artistSpinner = @$('#notifications-artist-works-spinner')

  scrollToPins: ->
    @jump.scrollToPosition @pinsOffset ?= @$pins.offset().top - $('#main-layout-header').height()

  scrollToTop: ->
    @jump.scrollToPosition 0

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
    @notifications.getNextPage(
      data: for_sale: @forSale
    )?.then (response) ->
      unless response.length
        $.waypoints 'destroy'

  nextArtistPage: =>
    @artist.related().artworks.getNextPage()?.then (response) ->
      data: filter: @forSaleArtist
      unless response.length
        $.waypoints 'destroy'

  isEmpty: ->
    !@notifications.length and (!@pinnedArtworks?.length is !@forSale)

  checkIfEmpty: =>
    @$feed.html(emptyTemplate()) if @isEmpty()

  toggleForSale: (e) ->
    @reloadFeedWorks()

  toggleArtist: (e) ->
    if @$selectedArtist then @$selectedArtist.attr 'data-state', null
    @$selectedArtist = @$(e.currentTarget).parent()
    @$selectedArtist.attr 'data-state', 'selected'
    @reloadFeedWorks()

  clearArtistWorks: (e) ->
    @$selectedArtist.attr 'data-state', null
    @$selectedArtist = ''
    @reloadFeedWorks()

  reloadFeedWorks: =>
    @forSale = $('.artsy-checkbox input').prop('checked')
    @$pins.hide()
    @$feed.hide()
    @$artistFeed.hide()
    @scrollToTop()

    # Artist filter selected
    if @$selectedArtist?.length
      @$artistSpinner.show()
      @artist = new Artist id: @$selectedArtist.attr('data-artist')
      @forSaleArtist = if @forSale then 'for_sale' else ''
      @artist.related().artworks.fetchUntilEnd
        data:
          filter: [@forSaleArtist]
        success: =>
          @$artistSpinner.hide()
          if @artist.related().artworks.length
            @renderColumns @$artistFeed, @artist.related().artworks
          else
            @$artistFeed.html emptyTemplate()
          @$artistFeed.show()
    # Regular feed with for_sale? toggle
    else
      @$spinner.show()
      @notifications.getFirstPage(
        data: for_sale: @forSale
        success: => @$feed.show()
      )?.then @checkIfEmpty

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
    @following.follow model.get('id')
    @$('.notifications-artist-list').prepend filterArtistTemplate
      artist:
        id: model.get('id')
        name: model.get('name')
        published_artworks_count: model.get('published_artworks_count')
    @$(".filter-artist[data-artist=#{model.get('id')}]").children('.filter-artist-name').click()

module.exports.init = ->
  new NotificationsView el: $('body')
  scrollFrame '#notifications-feed a'
  require './analytics.coffee'
