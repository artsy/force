Backbone        = require 'backbone'
BidderPosition  = require '../models/bidder_position.coffee'

module.exports = class BidderPositions extends Backbone.Collection
  model: BidderPosition

  url: ->
    "/api/v1/me/bidder_positions?sale_id=#{@sale.id}&artwork_id=#{@saleArtwork.id}"

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
