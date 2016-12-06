Backbone = require 'backbone'
BidderPosition = require '../models/bidder_position.coffee'
{ API_URL } = require('sharify').data
{ formatMoney } = require 'accounting'

module.exports = class BidderPositions extends Backbone.Collection

  model: BidderPosition

  url: ->
    "#{API_URL}/api/v1/me/bidder_positions?sale_id=#{@sale.id}&artwork_id=#{@saleArtwork.id}&retracted=false"

  initialize: (models, options = {}) ->
    { @saleArtwork, @sale } = options
    super

  isHighestBidder: ->
    highestBidId = @saleArtwork?.get('highest_bid')?.id
    return unless highestBidId
    @find (bidderPosition) ->
      bidderPosition.get('highest_bid')?.id is highestBidId

  isOutbid: ->
    @mostRecent() if @length > 0 and not @isHighestBidder()

  mostRecent: ->
    @max (bidderPosition) ->
      Date.parse(bidderPosition.get 'created_at')

  classes: ->
    if @isHighestBidder()
      'is-highest'
    else if @isOutbid()
      'is-outbid'

  minBidCents: ->
    Math.max(
      @first()?.get('suggested_next_bid_cents') or -Infinity
      @saleArtwork.get('minimum_next_bid_cents') or -Infinity
    )

  minBid: ->
    if @saleArtwork.get('minimum_next_bid_cents') >= (@first()?.get('suggested_next_bid_cents') or -Infinity)
      @saleArtwork.get('display_minimum_next_bid_dollars')
    else
      @first()?.get('display_suggested_next_bid_dollars')
