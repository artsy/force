_ = require 'underscore'
Backbone = require 'backbone'
{ Notifications } = require '../../../collections/notifications'
{ Artworks } = require '../../../../mobile/collections/artworks'
Artist = require '../../../models/artist.coffee'
DateHelpers = require '../../../../mobile/components/util/date_helpers.coffee'
{ API_URL } = require('sharify').data
artworkColumnsTemplate = -> require('../../../../mobile/components/artwork_columns/template.jade') arguments...
template = -> require('../templates/mobile/artist.jade') arguments...
emptyTemplate = -> require('../templates/mobile/empty.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  events:
    'click .notifications-see-more': 'trackSeeMore'

  initialize: (options) ->
    @notifications = new Notifications [], since: 30, type: 'ArtworkPublished'
    @$spinner = @$('#notifications-published-artworks-spinner')

    @listenTo @notifications, 'request', @indicateLoading
    @listenTo @notifications, 'sync', @appendArtworks
    @listenTo @notifications, 'sync', @concealLoading

    @setup =>
      @notifications.getFirstPage().then (response) =>
        unless @notifications.length
          @$('#notifications-published-artworks').html emptyTemplate()
          $(window).off 'infiniteScroll'

      $.onInfiniteScroll @nextPage

  trackSeeMore: (e) ->
    window.analytics.track(
      'Clicked "See More" in artwork group on "Works For You" page'
    )

  params: ->
    qs = location.search.substring(1)
    return {} unless qs.length
    _.reduce qs.split('&'), (memo, pair) ->
      [k, v] = pair.split '='
      memo[k] = decodeURIComponent v
      memo
    , {}

  setup: (cb) ->
    { artist_id } = @params()

    return cb() unless artist_id?

    artist = new Artist(id: artist_id)
    @pinnedArtworks = new Artworks
    @pinnedArtworks.url = "#{artist.url()}/artworks"

    callback = =>
      return cb() unless @pinnedArtworks.length
      group = _.tap {}, (group) =>
        name = @pinnedArtworks.first().get('artist')?.name or 'N/A'
        group[name] = @pinnedArtworks.models
      @renderArtworks group, false
      cb()

    @pinnedArtworks.fetch
      data: size: 6, published: true, sort: '-published_at'
      success: callback
      error: cb

  filterForPinned: (artworks) ->
    return artworks unless @pinnedArtworks?.length
    @pinnedIds ?= @pinnedArtworks.pluck 'id'
    _.reject artworks, (artwork) =>
      _.contains @pinnedIds, artwork.id

  concealLoading: ->
    @$spinner.hide()

  indicateLoading: ->
    @$spinner.show()

  appendArtworks: ->
    @renderArtworks @notifications.groupBy((notification) -> notification.get('artist').name)

  renderArtworks: (groupedArtworks, filter = true) ->
    for artistName, publishedArtworks of groupedArtworks
      artworks = new Artworks if filter then @filterForPinned(publishedArtworks) else publishedArtworks
      continue unless artworks.length
      artist = new Artist artworks.first().get('artist')
      publishedAt = DateHelpers.formatDate artworks.first().get('published_changed_at')
      @$('#notifications-published-artworks').append template(artist: artist, publishedAt: publishedAt, count: artworks.length)
      $column = @$('.notifications-list-item').last().find('.notifications-published-artworks').last()
      $column.append artworkColumnsTemplate(artworkColumns: artworks.groupByColumnsInOrder())

  nextPage: =>
    @notifications.getNextPage().then =>
      unless @notifications.length
        $(window).off 'infiniteScroll'
