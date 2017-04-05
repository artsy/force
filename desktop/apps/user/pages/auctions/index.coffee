{ invoke } = require 'underscore'
Backbone = require 'backbone'
MyActiveBids = require '../../../../components/my_active_bids/view'
BidHistoryView = require '../../components/bid_history/view'
AuctionRegistrationsView = require '../../components/auction_registrations/view'
template = -> require('./index.jade') arguments...

module.exports = class AuctionsView extends Backbone.View
  subViews: []

  className: 'settings-page__auctions'

  initialize: ({ @user }) -> #

  postRender: ->
    activeBidsView = new MyActiveBids user: @user
    @$('.js-settings-section__main--active-bids')
      .html activeBidsView.render().$el
    activeBidsView.start()

    bidHistoryView = new BidHistoryView user: @user
    @$('.js-settings-section__main--bid-history')
      .html bidHistoryView.render().$el
    bidHistoryView.fetch()

    auctionRegistrationsView = new AuctionRegistrationsView user: @user
    @$('.js-settings-section__main--auction-registrations')
      .html auctionRegistrationsView.render().$el
    auctionRegistrationsView.fetch()

    @subViews = [
      activeBidsView
      bidHistoryView
      auctionRegistrationsView
    ]

  render: ->
    @$el.html template
      user: @user
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
