_ = require 'underscore'
Backbone = require 'backbone'
{ FOLLOWING, API_URL } = sd = require('sharify').data
scrollFrame = require 'scroll-frame'
qs = require 'querystring'
Notifications = require '../../../collections/notifications.coffee'
CurrentUser = require '../../../models/current_user.coffee'
JumpView = require '../../../components/jump/view.coffee'
SidebarView = require './sidebar.coffee'
RecentlyAddedWorksView = require './recently_added_works.coffee'
ArtistWorksView = require './artist_works.coffee'
Following = require '../../../components/follow_button/collection.coffee'
emptyTemplate = -> require('../templates/empty.jade') arguments...

module.exports.NotificationsView = class NotificationsView extends Backbone.View

  initialize: ->

    @user = CurrentUser.orNull()
    @notifications = new Notifications null, since: 30, type: 'ArtworkPublished'
    @following = new Following FOLLOWING, kind: 'artist'
    { artist } = qs.parse(location.search.substring(1))

    @filterState = new Backbone.Model
      forSale: false
      artist: artist or null
      loading: true
      empty: false

    @sidebarView = new SidebarView
      el: @$('#notifications-filter')
      filterState: @filterState
      following: @following
    @recentlyAddedWorksView = new RecentlyAddedWorksView
      el: @$('#notifications-works')
      notifications: @notifications
      filterState: @filterState
      following: @following
    @artistWorksView = new ArtistWorksView
      el: @$('#notifications-artist-works')
      filterState: @filterState

    @filterState.on 'change', @render
    @setupJumpView()
    @filterState.trigger 'change'

    @submitReadNotification()

  render: =>
    @$('#notifications-page').attr 'data-state', (
      if @filterState.get 'loading'
        'loading'
      else if @filterState.get 'empty'
        'empty'
      else if @filterState.get 'artist'
        'artist'
      else
        'recent-works'
    )
    if @filterState.get 'empty'
      @$('#notifications-empty').html emptyTemplate
        artist: @filterState.get 'artist'

    @scrollToTop()

  setupJumpView: ->
    @jump = new JumpView threshold: $(window).height(), direction: 'bottom'
    @$el.append @jump.$el

  scrollToTop: ->
    @jump.scrollToPosition 0

  submitReadNotification: ->
    $.ajax
      method: 'PUT'
      url: "#{API_URL}/api/v1/me/notifications"
      data: status: 'read'

module.exports.init = ->
  new NotificationsView el: $('body')
  scrollFrame '#notifications-feed a' unless sd.EIGEN
  require './analytics.coffee'
