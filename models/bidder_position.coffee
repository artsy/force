_           = require 'underscore'
Backbone    = require 'backbone'
sd          = require('sharify').data
accounting  = require 'accounting'

module.exports = class BidderPosition extends Backbone.Model
  url: ->
    "#{sd.ARTSY_URL}/api/v1/me/bidder_position"

  currentBid: ->
    accounting.formatMoney(
      @get('highest_bid').amount_cents / 100, '$', 0
    )

  maxBid: ->
    accounting.formatMoney(
      @get('max_bid_amount_cents') / 100, '$', 0
    )
