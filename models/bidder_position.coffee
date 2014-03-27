_        = require 'underscore'
Backbone = require 'backbone'
sd       = require('sharify').data

module.exports = class BidderPosition extends Backbone.Model

  url: -> "#{sd.ARTSY_URL}/api/v1/me/bidder_position"
