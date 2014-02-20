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

    if @$('.exhibitors-column-container').length
      # Delay this since it is below the fold. Don't want it to slow down other requests.
      _.delay =>
        @initializeFollowButtons()
      , 1000

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
    new FeedItems().fetch
      url: url
      data:
        sortOrder: @sortOrder
        size: 3
      success: (items) =>
        success items.models
