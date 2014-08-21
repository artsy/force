_ = require 'underscore'
Backbone = require 'backbone'
Notifications = require '../../../collections/notifications.coffee'
Artworks = require '../../../collections/artworks.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artist = require '../../../models/artist.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
DateHelpers = require '../../../components/util/date_helpers.coffee'

template = -> require('../templates/artist.jade') arguments...

module.exports.NotificationsView = class NotificationsView extends Backbone.View
  
  initialize: (options) ->
    @user = CurrentUser.orNull()
    @notifications = new Notifications(null, since: 30, type: 'ArtworkPublished', userId: @user.get('id'))
    @notifications.on 'sync', @appendArtworks
    @notifications.fetch
      success: =>
        @$('#notifications-published-artworks-spinner').remove()
    $.onInfiniteScroll @nextPage

  # Needs an artwork column view for each group (by artist)
  appendArtworks: =>
    grouppedArtworks = @notifications.groupBy((n) -> n.get('artist').name)
    for artistName, publishedArtworks of grouppedArtworks
      artworks = new Artworks publishedArtworks
      artist = new Artist artworks.first().get('artist')
      publishedAt = DateHelpers.formatDate artworks.first().get('published_changed_at')
      @$('#notifications-published-artworks').append template(artist: artist, publishedAt: publishedAt, count: artworks.length)
      new ArtworkColumnsView
        el: @$('.notifications-list-item').last().find('.notifications-published-artworks').last()
        collection: artworks
        artworkSize: 'larger'
        numberOfColumns: 3
        gutterWidth: 40
        allowDuplicates: true
        maxArtworkHeight: 600

  nextPage: =>
    @notifications.getNextPage()

module.exports.init = ->
  new NotificationsView
    el: $('body')