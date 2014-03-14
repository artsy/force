_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
FollowProfileButton = require '../../../components/partner_buttons/follow_profile.coffee'
FollowProfiles = require '../../../collections/follow_profiles.coffee'
FeedItems = require '../../../components/feed/collections/feed_items.coffee'
PoplockitFeed = require('../../../components/feed/client/poplockit_feed.coffee')
ArtworkColumnsView = require('../../../components/artwork_columns/view.coffee')
Artworks = require '../../../collections/artworks.coffee'

COLUMN_WIDTH = 300

module.exports = class UserProfileView extends Backbone.View

  initialize: (options) ->
    @followProfiles = if CurrentUser.orNull() then new FollowProfiles [] else null
    new FollowProfileButton
      el: @$(".profile-header .follow-button")
      model: @model
      collection: @followProfiles
    @followProfiles?.syncFollows [@model.get('id')]
    @model.fetchFavorites success: ((@favorites) =>), complete: => @render()
    @model.fetchPosts success: ((@posts) =>), complete: => @render()

  render: _.after 2, ->
    @renderState()
    @renderPosts()
    @renderFavorites()

  renderState: ->
    args = [
      'data-state'
      [
        if @posts?.length then 'posts' else ''
        if @favorites?.length then 'favorites' else ''
      ].join('')
    ]
    @$('#profile-tabs').attr args...
    @$el.attr args...

  renderPosts: ->
    return unless @posts?.length
    new PoplockitFeed
      limitPostBodyHeight: true
      feedItems: @posts
      el: @$('#profile-feed')

  renderFavorites: ->
    return unless @favorites?.length
    @columnsView = new ArtworkColumnsView
      el: @$('#profile-favorites')
      collection: new Artworks
      artworkSize: 'tall'
      numberOfColumns: Math.round @$el.width() / COLUMN_WIDTH
      gutterWidth: 40
    @columnsView.appendArtworks @favorites.models