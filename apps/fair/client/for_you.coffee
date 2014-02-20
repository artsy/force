_              = require 'underscore'
Backbone       = require 'backbone'
sd             = require('sharify').data
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'
FeedView       = require '../../../components/feed/client/feed.coffee'
Artist         = require '../../../models/artist.coffee'
Profile        = require '../../../models/profile.coffee'
Profiles       = require '../../../collections/profiles.coffee'
Artworks       = require '../../../collections/artworks.coffee'
Artists        = require '../../../collections/artists.coffee'
FollowProfiles = require '../../../collections/follow_profiles.coffee'
CurrentUser    = require '../../../models/current_user.coffee'
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
FollowProfileButton = require '../../partners/client/follow_profiles_button.coffee'
exhibitorsTemplate  = -> require('../templates/exhibitors_columns.jade') arguments...

module.exports = class ForYouView extends Backbone.View

  sortOrder: "-featured"

  initialize: (options) ->
    { @fair, @profile } = options
    @currentUser = CurrentUser.orNull()
    @collection ?= new Artworks()
    @initializeArtworkColumns()

    if sd.CURRENT_USER?
      @fetchFollowingArtists()
      @fetchFollowingExhibitors()
    else
      @showHideBlankState()

    @fetchAndAppendShows()

  initializeFollowButtons: ->
    @followProfiles = if CurrentUser.orNull() then new FollowProfiles [] else null
    ids = []
    @$('.exhibitors-column-container .follow-button').each (index, item) =>
      id = $(item).attr('data-id')
      model = new Profile(id: id)
      @initFollowButton model, item
      ids.push id
    @followProfiles?.syncFollows ids

  initFollowButton: (profile, el) ->
    new FollowProfileButton
      el         : el
      model      : profile
      collection : @followProfiles

  fetchFollowingArtists: ->
    url = "#{sd.ARTSY_URL}/api/v1/me/follow/artists"
    data = fair_id: @fair.get('id')
    followingArtists = new Artists()
    followingArtists.fetchUntilEnd
      url: url
      data: data
      success: =>
        if followingArtists.length
          for artist in followingArtists.models
            @fetchAndAppendArtistArtworks artist.get('artist').id
        else
          @$('.foryou-section.artists').remove()
          @showHideBlankState()

  showHideBlankState: ->
    if @$('.foryou-section.artists').length < 1 and @$('.foryou-section.partners').length < 1
      @$('.blank-state').show()

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
        if followingExhibitors.length
          feedItems = new FeedItems()
          feedItems.doneFetching = true
          feed = new FeedView
            el               : @$('.foryou-section.partners .feed')
            feedItems        : feedItems
          for exhibitor in followingExhibitors.models
            @fetchAndAppendBooth exhibitor.get('profile'), feed
        else
          @$('.foryou-section.partners').remove()
          @showHideBlankState()

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

  fetchAndAppendShows: (feedItems) ->
    url = "#{@fair.url()}/shows"
    feedItems = new FeedItems()
    feedItems.urlRoot = "#{@fair.url()}/shows"
    # We have to fetch sequentially since we use a cursor here
    feedItems.fetchFeedItems
      size: 3
      sort: '-featured'
      success: (items1) =>
        feedItems.fetchFeedItems
          success: (items2) =>
            feedItems.fetchFeedItems
              success: (items3) =>
                feedItems.fetchFeedItems
                  success: (items4) =>
                    feedItems.fetchFeedItems
                      success: (items5) =>
                        @appendFeedItems _.zip(items1.models, items2.models, items3.models, items4.models, items5.models)

  appendFeedItems: (columns) ->
    @$('.exhibitors-column-container').html exhibitorsTemplate(columns: columns)
    if @$('.exhibitors-column-container').length
      @initializeFollowButtons()
