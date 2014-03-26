Backbone = require 'backbone'

module.exports = class BidderPositions extends Backbone.Collection
  url: ->
    "/api/v1/me/bidder_positions?sale_id=#{@saleId}&artwork_id=#{@artworkId}"

  initialize: (models, options) ->
    { @saleId, @artworkId } = options
    super

