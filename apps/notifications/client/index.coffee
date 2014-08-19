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
    @notifications.fetch
      success: =>
        @$('#notifications-published-artworks-spinner').remove()
        @appendArtworks()
    $.onInfiniteScroll @nextPage

  # Needs an artwork column view for each group (by artist)
  appendArtworks: ->
    grouppedArtworks = @notifications.groupBy((n) -> n.get('artist').name)
    for artistName, publishedArtworks of grouppedArtworks
      artworks = new Artworks publishedArtworks
      artist = new Artist artworks.first().get('artist')
      publishedAt = DateHelpers.formatDate artworks.first().get('published_changed_at')
      @$('#notifications-published-artworks').append template(artist: artist, publishedAt: publishedAt)
      new ArtworkColumnsView
        el: @$('.notifications-list-item').last().find('.notifications-published-artworks').last()
        collection: artworks
        artworkSize: 'larger'
        numberOfColumns: 4
        gutterWidth: 80
        allowDuplicates: true

  nextPage: =>
    @notifications.state.currentPage++
    @notifications.fetch
      success: =>
        @appendArtworks()

module.exports.init = ->
  new NotificationsView
    el: $('body')