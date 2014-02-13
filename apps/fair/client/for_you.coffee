_              = require 'underscore'
Backbone       = require 'backbone'
sd             = require('sharify').data
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'
FeedView       = require '../../../components/feed/client/feed.coffee'
Artist         = require '../../../models/artist.coffee'
Profiles       = require '../../../collections/profiles.coffee'
Artworks       = require '../../../collections/artworks.coffee'
Artists        = require '../../../collections/artists.coffee'
CurrentUser    = require '../../../models/current_user.coffee'
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'

module.exports = class ForYouView extends Backbone.View

  sortOrder: "-updated_at"

  initialize: (options) ->
    { @fair, @profile } = options
    @currentUser = CurrentUser.orNull()
    @collection ?= new Artworks()
    @initializeArtworkColumns()

    @fetchFollowingArtists()
    @fetchFollowingExhibitors()
    @fetchBooths()

  fetchFollowingArtists: ->
    url = "#{sd.ARTSY_URL}/api/v1/me/follow/artists"
    data = fair_id: @fair.get('id')
    followingArtists = new Artists()
    followingArtists.fetchUntilEnd
      url: url
      data: data
      success: =>
        for artist in followingArtists.models
          @fetchAndAppendArtistArtworks artist.get('artist').id

  # Fetches partner shows and appends artworks in those shows
  # - Assumes we get back all artworks in the show
  # - Assumes there are no more than 3 shows for each artist
  fetchAndAppendArtistArtworks: (artistId) ->
    new FeedItems().fetch
      url: "#{@fair.url()}/shows"
      data:
        artworks  : true
        artist    : artistId
        size      : 3
      success: (items) =>
        for item in items.models
          @artworkColumnsView.appendArtworks item.artworks().models

  initializeArtworkColumns: ->
    minWidth = 850
    maxWidth = 1084
    containerWidth = @$el.width()
    width = Math.max(minWidth, Math.min(containerWidth, maxWidth))
    @artworkColumnsView = new ArtworkColumnsView
      el: @$('.foryou-section.artists .artworks')
      collection: @collection
      numberOfColumns: 4
      gutterWidth: 40
      totalWidth: width

  fetchFollowingExhibitors: ->
    url = "#{sd.ARTSY_URL}/api/v1/me/follow/profiles"
    data = fair_id: @fair.get('id')
    followingExhibitors = new Profiles()
    followingExhibitors.fetchUntilEnd
      url: url
      data: data
      success: =>
        feedItems = new FeedItems()
        feedItems.doneFetching = true
        feed = new FeedView
          el               : @$('.foryou-section.partners .feed')
          feedItems        : feedItems

        for exhibitor in followingExhibitors.models
          @fetchAndAppendBooth exhibitor.get('profile'), feed

  fetchAndAppendBooth: (profile, feed) ->
    return unless profile.owner?.id
    url = "#{@fair.url()}/shows"
    additionalParams = artworks: true, sortOrder: @sortOrder, partner: profile.owner.id
    new FeedItems().fetch
      url: url
      data:
        _.extend(additionalParams, size: 3)
      success: (items) =>
        feed.handleFetchedItems items.models

  fetchBooths: ->
    url = "#{@fair.url()}/shows"
    additionalParams = artworks: true, sortOrder: @sortOrder
    new FeedItems().fetch
      url: url
      data:
        _.extend(additionalParams, size: 3)
      success: (items) =>
        if items.models.length > 0
          items.urlRoot = url
          new FeedView
            el               : @$('.foryou-section.booths .feed')
            feedItems        : items
            additionalParams : additionalParams
