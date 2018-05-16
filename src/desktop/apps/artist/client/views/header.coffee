_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
{ CURRENT_ITEM } = require('sharify').data
ShareView = require '../../../../components/share/view.coffee'
currentItemTemplate = -> require('../../components/current_item/index.jade') arguments...
viewHelpers = require '../../view_helpers.coffee'
{ numberFormat } = require 'underscore.string'

module.exports = class ArtistHeaderView extends Backbone.View
  initialize: ({ @user, @jump }) ->
    @setupShareButtons()
    @setupFollowButton()
    @updateCurrentItem()
    # TODO: ARTIST_MARKET_DATA_TEST remove after test closes
    @setupMarketDataSummary()

    @$window = $ window
    @$('a').click @navClick

  setupShareButtons: ->
    new ShareView el: @$('.artist-share')

  setupMarketDataSummary: ->
    require('./market_data_summary.js').default.renderArtistMarketDataSummary(@model.id)

  setupFollowButton: ->
    view = this
    @following = new Following(null, kind: 'artist') if @user
    @$('#artist-follow-button, .artist-sticky-follow-button').each ->
      followButton = new FollowButton
        context_page: "Artist page"
        context_module: "Header"
        el: $(this)
        following: view.following
        modelName: 'artist'
        model: view.model

      view.listenTo followButton, 'followed', -> view.updateFollowCount 1
      view.listenTo followButton, 'unfollowed', -> view.updateFollowCount -1

    @following?.syncFollows [@model.id]

  updateFollowCount: (i) ->
    return if not @$('.artist-header-follow-count').length
    count = parseInt(@$('.artist-header-follow-count').attr('data-count').replace(/,/g, "")) + i
    @$('.artist-header-follow-count').attr 'data-count', numberFormat count

  updateCurrentItem: ->
    currentItem = CURRENT_ITEM
    if currentItem
      currentItem.detail = viewHelpers.formatAuctionDetail(currentItem) if currentItem.type is 'auction'
      @$('.current-item-container').html currentItemTemplate { currentItem, viewHelpers }

  navClick: (e) =>
    if e.target.pathname is window.location.pathname
      e.preventDefault()
      @jump.scrollToTop() if @$window.scrollTop() isnt 0
