_ = require 'underscore'
Backbone = require 'backbone'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
{ CURRENT_SHOW_AUCTION } = require('sharify').data
ShareView = require '../../../../components/share/view.coffee'
currentItemTeplate = -> require('../../components/current_show_auction/index.jade') arguments...
viewHelpers = require '../../view_helpers.coffee'

module.exports = class ArtistHeaderView extends Backbone.View
  initialize: ({ @user, @jump }) ->
    @setupShareButtons()
    @setupFollowButton()
    @updateCurrentItem()
    @$window = $ window
    @$window.on 'scroll', _.throttle(@popLock, 150)
    @$('a').click @navClick

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
    new FollowButton
      analyticsFollowMessage: 'Followed artist, via artist header'
      analyticsUnfollowMessage: 'Unfollowed artist, via artist header'
      el: @$('.artist-sticky-follow-button')
      following: @following
      modelName: 'artist'
      model: @model
    @following?.syncFollows [@model.id]

  updateCurrentItem: ->
    currentItem = CURRENT_SHOW_AUCTION
    if currentItem?.type is 'auction'
      currentItem.detail = viewHelpers.formatShowDetail currentItem
      @$('.current-item').html currentItemTeplate { currentItem, viewHelpers }

  navClick: (e) =>
    if e.target.pathname is window.location.pathname
      e.preventDefault()
      @jump.scrollToTop() if @$window.scrollTop() isnt 0

  popLock: =>
    mainHeaderHeight = $('#main-layout-header').height()
    bottomOfMenu = @$window.scrollTop() + mainHeaderHeight
    tabsOffset = @$('.artist-sticky-header').offset().top
    if tabsOffset <= bottomOfMenu
      @$('.artist-sticky-header').addClass('artist-sticky-header-fixed')
      responsiveMargin = $('.main-layout-container').offset().left

    else
      @$('.artist-sticky-header').removeClass('artist-sticky-header-fixed')

