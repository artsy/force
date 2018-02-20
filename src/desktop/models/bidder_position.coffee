_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
accounting = require 'accounting'

module.exports = class BidderPosition extends Backbone.Model
  urlRoot: ->
    "#{sd.API_URL}/api/v1/me/bidder_position"

  currentBid: ->
    return unless @has('highest_bid')
    @get('highest_bid').display_amount_dollars

  maxBid: ->
    @get('display_max_bid_amount_dollars')
