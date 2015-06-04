{ API_URL } = require('sharify').data
Sales = require './sales.coffee'
Auction = require '../models/auction.coffee'

module.exports = class Auctions extends Sales
  model: Auction

  url: "#{API_URL}/api/v1/sales?is_auction=true"

  previews: ->
    @select (auction) ->
      auction.isAuction() and
      auction.isPreview()

  opens: ->
    @select (auction) ->
      auction.isAuction() and
      auction.isOpen()

  closeds: ->
    @select (auction) ->
      # Includes auction promos
      (auction.isAuction() or auction.isAuctionPromo()) and
      auction.isClosed()

  auctions: ->
    @select (auction) ->
      auction.isAuction()

  currentAuctionPromos: ->
    @select (auction) ->
      auction.isAuctionPromo() and
      not auction.isClosed()

  next: ->
    @previews()[0]
