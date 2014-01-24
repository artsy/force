_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
Post                    = require '../../../models/post.coffee'
Profile                 = require '../../../models/profile.coffee'
CurrentUser             = require '../../../models/current_user.coffee'
FollowProfileButton     = require '../../partners/client/follow_profiles_button.coffee'
FollowProfiles          = require '../../../collections/follow_profiles.coffee'
FeedItem                = require '../../../components/feed/models/feed_item.coffee'
feedItemTemplate        = -> require('../../../components/feed/templates/feed_item_two_column.jade') arguments...

module.exports.PostView = class PostView extends Backbone.View

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

  # remove!
  marginLeftRight: 110
  maxWidth: 1084
  textColumnWidth: 404
  textColumnMargin: 80
  renderPost: ->
    feedItem = new FeedItem(sd.POST)
    feedItem.set _type: 'Post'
    @fixedWidth = @getFixedWidth()
    @$('section.feed-items').html feedItemTemplate(
      feedItem: feedItem
      sd: sd
      fixedWidth: @fixedWidth
      maxDimension: @getMaxDimension()
      textColumnWidth: 404
    )

  getFixedWidth: ->
    windowWidth = @$window.innerWidth()  || 800
    if windowWidth > @maxWidth then @maxWidth else windowWidth - @marginLeftRight

  getMaxDimension: ->
    @fixedWidth - @textColumnWidth - @textColumnMargin

module.exports.init = ->
  new PostView
    profile: new Profile sd.PROFILE
    model  : new Post sd.POST
    el     : $('#post')
