_ = require 'underscore'
Backbone = require 'backbone'
Notifications = require '../../../collections/notifications.coffee'
Artworks = require '../../../collections/artworks.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artist = require '../../../models/artist.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
DateHelpers = require '../../../components/util/date_helpers.coffee'
JumpView = require '../../../components/jump/view.coffee'
template = -> require('../templates/artist.jade') arguments...

module.exports.NotificationsView = class NotificationsView extends Backbone.View
  events:
    'click #for-sale': 'toggleForSale'

  initialize: ->
    @cacheSelectors()

    @user = CurrentUser.orNull()
    @notifications = new Notifications null, since: 30, type: 'ArtworkPublished', userId: @user.get('id')

    @listenTo @notifications, 'request', @indicateLoading
    @listenTo @notifications, 'sync', @appendArtworks
    @listenTo @notifications, 'sync', @concealLoading

    @setupJumpView()

    @notifications.getFirstPage()
    $.onInfiniteScroll @nextPage

  setupJumpView: ->
    @jump = new JumpView threshold: $(window).height(), direction: 'bottom'
    @$el.append @jump.$el

  indicateLoading: ->
    @$spinner.show()

  concealLoading: ->
    @$spinner.hide()

  cacheSelectors: ->
    @$spinner = @$('#notifications-published-artworks-spinner')
    @$publishedArtworks = @$('#notifications-published-artworks')

  appendArtworks: ->
    if @notifications.state.currentPage is 1
      # Reset the DOM
      renderMethod = 'html'
      @columnViews = []
      # Remove any existing column views
      _.each @columnViews, (view) -> view?.remove()
    else
      renderMethod = 'append'

    groupedArtworks = @groupArtworks @notifications
    for artistName, publishedArtworks of groupedArtworks
      artworks = new Artworks publishedArtworks
      artist = new Artist artworks.first().get('artist')
      publishedAt = DateHelpers.formatDate artworks.first().get('published_changed_at')

      # Render container
      @$publishedArtworks[renderMethod] template
        artist: artist
        publishedAt: publishedAt
        count: artworks.length

      # Only reset the DOM on the first iteration
      renderMethod = 'append'

      # Render columns
      @columnViews.push new ArtworkColumnsView
        el: @$('.notifications-list-item').last().find('.notifications-published-artworks').last()
        collection: artworks
        artworkSize: 'large'
        numberOfColumns: 3
        gutterWidth: 40
        allowDuplicates: true
        maxArtworkHeight: 600

  groupArtworks: (notifications) ->
    @notifications.groupBy (notification) ->
      notification.get('artist').name

  nextPage: =>
    @notifications.getNextPage()

  toggleForSale: (e) ->
    toggle = $(e.currentTarget).prop('checked')
    @$publishedArtworks.hide()
    @notifications.getFirstPage
      data: for_sale: toggle
      success: => @$publishedArtworks.show()

module.exports.init = ->
  new NotificationsView el: $('body')
  require './analytics.coffee'
