_ = require 'underscore'
Backbone = require 'backbone'
ShareView = require '../../../../components/share/view.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'

module.exports = class ArtistHeaderView extends Backbone.View
  initialize: ({ @user }) ->
    @setupShareButtons()
    @setupFollowButton()

  setupShareButtons: ->
    new ShareView el: @$('.artist-share')

  setupFollowButton: ->
    @following = new Following(null, kind: 'artist') if @user
    new FollowButton
      analyticsFollowMessage: 'Followed artist, via artist header'
      analyticsUnfollowMessage: 'Unfollowed artist, via artist header'
      el: @$('#artist-follow-button')
      following: @following
      modelName: 'artist'
      model: @model
    @following?.syncFollows [@model.id]
