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
  initialize: ->
    @cacheSelectors()

    @user = CurrentUser.orNull()
    @notifications = new Notifications null, since: 30, type: 'ArtworkPublished', userId: @user.get('id')

    @listenTo @notifications, 'request', @indicateLoading
    @listenTo @notifications, 'sync', @appendArtworks
    @listenTo @notifications, 'sync', @concealLoading

    @setupJumpView()

    @notifications.fetch()
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
    groupedArtworks = @groupArtworks @notifications
    for artistName, publishedArtworks of groupedArtworks
      artworks = new Artworks publishedArtworks
      artist = new Artist artworks.first().get('artist')
      publishedAt = DateHelpers.formatDate artworks.first().get('published_changed_at')
      # Render container
      @$publishedArtworks.append template(artist: artist, publishedAt: publishedAt, count: artworks.length)
      # Render columns
      new ArtworkColumnsView
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

module.exports.init = ->
  new NotificationsView el: $('body')
