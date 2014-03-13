_ = require 'underscore'
Backbone = require 'backbone'
User = require '../../../models/user.coffee'
CurrentUser = require '../../../models/current_user.coffee'
FollowProfileButton = require '../../../components/partner_buttons/follow_profile.coffee'
FollowProfiles = require '../../../collections/follow_profiles.coffee'
FeedItems = require '../../../components/feed/collections/feed_items.coffee'
PoplockitFeed = require('../../../components/feed/client/poplockit_feed.coffee')
tabsTemplate = -> require('../templates/tabs.jade') arguments...

module.exports = class UserProfileView extends Backbone.View

  initialize: (options) ->
    @followProfiles = if CurrentUser.orNull() then new FollowProfiles [] else null
    new FollowProfileButton
      el: @$(".profile-header .follow-button")
      model: @model
      collection: @followProfiles
    @followProfiles?.syncFollows [@model.get('id')]
    @fetchUserCollection()
    # @model.fetchFavorites success: (@favorites) => @render()
    # @model.fetchPosts success: (@posts) => @render()
    # @render()

  render: _.after 2, ->
    console.log @favorites, @posts

  # Scenarios:
  # - posts no favorites
  # - favorites no posts
  # - posts and favorites
  # - no posts no favorites
  _render: ->
    @fetchUserCollection()
    @fetchUserPosts()

  fetchUserCollection: ->
    owner = new User(@model.get('owner'))
    owner.fetch
      success: =>
        owner.initializeDefaultArtworkCollection
          success: =>
            console.log owner.defaultArtworkCollection().toJSON()
            if owner.defaultArtworkCollection().displayable()
              @hasCollection = true
              @renderTabs()
              # Todo: Render favorites
            else
              @handleEmptyFavorites()
          error: (response) =>
            @handleEmptyFavorites()

  fetchUserPosts: ->
    url = "#{sd.ARTSY_URL}/api/v1/profile/#{@model.get('id')}/posts"
    new FeedItems().fetch
      url: url
      data:
        size: 3
      success: (items) =>
        @afterPostsFetched()
        if items.models.length > 0
          items.urlRoot = url
          new PoplockitFeed
            limitPostBodyHeight : true
            feedItems           : items
            el                  : @$('.feed')
        else
          callback?.error()

      error: =>
        @handleEmptyPosts()

  # There are only two tabs - posts and favorites
  # If there are no favorites we re-render the header and select the posts tab
  handleEmptyFavorites: =>
    @hasCollection = false
    @renderTabs()

  handleEmptyPosts: =>
    @hasPosts = false
    @renderTabs()

  afterPostsFetched: (posts) =>
    if posts?.length > 0
      @hasPosts = true
      @renderTabs()
    else
      @handleEmptyPosts()

  renderTabs: ->
    @$('.profile-tabs-container').html tabsTemplate(
      hasPosts      : @hasPosts
      hasCollection : @hasCollection
      baseUrl       : @model.href()
    )
