Backbone = require 'backbone'
{ FOLLOWING, API_URL } = sd = require('sharify').data
qs = require 'querystring'
{ Notifications } = require '../../../collections/notifications'
CurrentUser = require '../../../models/current_user'
JumpView = require '../../../components/jump/view.coffee'
SidebarView = require './sidebar.coffee'
UrlUpdater = require './url_updater.coffee'
Following = require '../../../components/follow_button/collection.coffee'
Cookies = require '../../../components/cookies/index'
MobileNotificationsView = require './mobile.coffee'

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
      initialLoad: true

    @sidebarView = new SidebarView
      el: @$('#notifications-filter')
      filterState: @filterState
      following: @following

    @filterState.on 'change', @render
    @setupJumpView()

    @filterState.trigger 'change'

    urlUpdater = new UrlUpdater
      filterState: @filterState

  render: =>
    @$('#notifications-page').attr 'data-forsale', @filterState.get('forSale')

    @scrollToTop()

  setupJumpView: ->
    @jump = new JumpView threshold: $(window).height(), direction: 'bottom'
    @$el.append @jump.$el

  scrollToTop: ->
    @jump.scrollToPosition 0

module.exports.init = ->
  if sd.IS_MOBILE
    new MobileNotificationsView el: $('body')
  else
    new NotificationsView el: $('body')
