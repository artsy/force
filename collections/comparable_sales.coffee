_                   = require 'underscore'
sd                  = require('sharify').data
Backbone            = require 'backbone'
AuctionLot          = require '../models/auction_lot.coffee'

module.exports = class ComparableResults extends Backbone.Collection
  model: AuctionLot

  url: -> "#{sd.API_URL}/api/v1/artwork/#{@id}/comparable_sales"

  initialize: (models, options={}) ->
    { @id } = options
    super
