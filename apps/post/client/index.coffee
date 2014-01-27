_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
Post                    = require '../../../models/post.coffee'
Profile                 = require '../../../models/profile.coffee'
CurrentUser             = require '../../../models/current_user.coffee'
FollowProfileButton     = require '../../partners/client/follow_profiles_button.coffee'
FollowProfiles          = require '../../../collections/follow_profiles.coffee'
FeedItem                = require '../../../components/feed/models/feed_item.coffee'
FeedItems               = require '../../../components/feed/collections/feed_items.coffee'
PoplockitFeed           = require('../../../components/feed/client/poplockit_feed.coffee')

module.exports = class PostView extends Backbone.View

  initialize: (options) ->
    @$window = $(window)
    @followProfiles = if CurrentUser.orNull() then new FollowProfiles [] else null
    @initFollowButton options.profile
    @followProfiles?.syncFollows [options.profile.get('id')]
    @renderPost()

  initFollowButton: (profile) ->
    new FollowProfileButton
      el: @$(".profile-header .follow-button")
      collection: @followProfiles
      model: profile

  renderPost: ->
    feedItem = new FeedItem(sd.POST)
    feedItem.set _type: 'Post'
    items = new FeedItems()
    items.add feedItem
    new PoplockitFeed
      feedItems : items
      el        : @$('.feed')

module.exports.init = ->
  new PostView
    profile: new Profile sd.PROFILE
    model  : new Post sd.POST
    el     : $('#post')
