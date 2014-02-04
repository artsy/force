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
OrderedSets             = require '../../../collections/ordered_sets.coffee'
FeaturedPosts           = require './featured_posts.coffee'
RelatedArtists          = require './related_artists.coffee'

module.exports = class PostView extends Backbone.View

  pageSize   : 10

  initialize: (options) ->
    @$window = $(window)
    @currentUser = CurrentUser.orNull()
    @followProfiles = if @currentUser then new FollowProfiles [] else null
    @initFollowButton options.profile
    @followProfiles?.syncFollows [options.profile.get('id')]
    @renderPost()

    @renderRelatedArtists()
    @renderFeaturedPosts()

  fetchSets: ->
    @orderedSets = new OrderedSets
      owner_type: 'Post'
      owner_id: @model.get('id')
      sort: 'key'
    @orderedSets.fetch()

  initFollowButton: (profile) ->
    new FollowProfileButton
      el: @$(".profile-header .follow-button")
      collection: @followProfiles
      model: profile

  renderSets: ->
    sets = @orderedSets
    return @$('.related_sets').remove() if sets.length is 0

    @$('.post-related-sets').html OrderedSetsTemplate(sets: sets)

  renderPost: ->
    feedItem = new FeedItem(sd.POST)
    feedItem.set _type: 'Post'
    items = new FeedItems()
    items.add feedItem
    items.doneFetching = true
    new PoplockitFeed
      limitPostBodyHeight : false
      feedItems           : items
      el                  : @$('.feed')

  renderFeaturedPosts: ->
    @featuredPosts = new FeaturedPosts
      el          : @$('.post-featured-posts')
      feed        : @feed
      model       : @model
      pageSize    : @pageSize

  renderRelatedArtists: ->
    @relatedArtists = new RelatedArtists
      el         : @$('.post-related-artists')
      model      : @model
      postSize   : @pageSize
      currentUser : @currentUser

module.exports.init = ->
  new PostView
    profile: new Profile sd.PROFILE
    model  : new Post sd.POST
    el     : $('#post')
