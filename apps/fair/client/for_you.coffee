_              = require 'underscore'
Backbone       = require 'backbone'
sd             = require('sharify').data
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'
FeedView       = require '../../../components/feed/client/feed.coffee'
Artist         = require '../../../models/artist.coffee'
Profiles       = require '../../../collections/profiles.coffee'
CurrentUser    = require '../../../models/current_user.coffee'
FeedItems      = require '../../../components/feed/collections/feed_items.coffee'

module.exports = class ForYouView extends Backbone.View

  sortOrder: "-updated_at"

  initialize: (options) ->
    { @fair, @profile } = options
    @currentUser = CurrentUser.orNull()
    @fetchFollowingExhibitors()
    @fetchBooths()

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

  # TODO: Personalized in some way?
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
