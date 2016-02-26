_ = require 'underscore'
Backbone = require 'backbone'
ShareView = require '../../../../components/share/view.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'

module.exports = class ArtistHeaderView extends Backbone.View
  initialize: ({ @user }) ->
    @setupShareButtons()
    @setupFollowButton()
    @$window = $ window
    @$window.on 'scroll', @popLock

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

  popLock: =>
    console.log 'scroll'
    if @$window.scrollTop() - $('#main-layout-header').height() >= @$('.artist-tabs').offset().top
      @$('.artist-tabs').addClass('artist-fixed-header')
    else
      @$('.artist-tabs').removeClass('artist-fixed-header')