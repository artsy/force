sd = require('sharify').data
Backbone = require 'backbone'
query = require './query.coffee'
{ metaphysics2 } = require '../../../lib/metaphysics2'
template = -> require('./template.jade') arguments...
{getLiveAuctionUrl} = require('../../../desktop/apps/auction/utils/urls')

module.exports = class MyActiveBids extends Backbone.View
  events:
    "click .my-active-bids-bid-button": "trackClickedBid"

  initialize: ({ @user, @saleId, @template = template }) ->

  start: ->
    @fetch().then => @render() and @poll()

  poll: =>
    @interval = setInterval(
      (=> @fetch().then @render)
      sd.ACTIVE_BIDS_POLL_INTERVAL
    )
    this

  fetch: ->
    metaphysics2(
      query: query
      variables: live: true, sale_id: @saleId
      req: user: @user
    ).then (data) =>
      @bidderPositions = data.me?.lot_standings

  trackClickedBid: (e) ->
    artworkId = $(e.target)
      .parent()
      .data("artwork_id")
    window.analytics.track('Clicked "Bid"', {
      auction_slug: @saleId,
      user_id: @user.id,
      context_type: "your active bids",
      artwork_slug: artworkId,
    })

  render: =>
    @$el.html @template myActiveBids: @bidderPositions, viewHelpers: { getLiveAuctionUrl }
    this

  remove: ->
    clearInterval @interval
