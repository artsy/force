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
UrlUpdater = require './url_updater.coffee'
Following = require '../../../components/follow_button/collection.coffee'
Cookies = require '../../../components/cookies/index.coffee'
emptyTemplate = -> require('../templates/empty.jade') arguments...

module.exports.NotificationsView = class NotificationsView extends Backbone.View

  initialize: ->

    @user = CurrentUser.orNull()
    @notifications = new Notifications null, since: 30, type: 'ArtworkPublished'
    @following = new Following FOLLOWING, kind: 'artist'
    { artist, for_sale } = qs.parse(location.search.substring(1))
    Cookies.expire('notification-count')

    @filterState = new Backbone.Model
      forSale: !!for_sale || true
      artist: artist or null
      loading: true
      empty: false
      initialLoad: true

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

    urlUpdater = new UrlUpdater
      filterState: @filterState

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
    @$('#notifications-page').attr 'data-forsale', @filterState.get('forSale')
    if @filterState.get 'empty'
      @$('#notifications-empty').html emptyTemplate
        artist: @filterState.get 'artist'

    @scrollToTop()

  setupJumpView: ->
    @jump = new JumpView threshold: $(window).height(), direction: 'bottom'
    @$el.append @jump.$el

  scrollToTop: ->
    @jump.scrollToPosition 0

module.exports.init = ->
  new NotificationsView el: $('body')
  scrollFrame '#notifications-feed a' unless sd.EIGEN
