{ AUCTION } = require('sharify').data
ArtworkAuctionView = require './view.coffee'

module.exports = ->
  return unless AUCTION?

  view = new ArtworkAuctionView el: $('.js-artwork-auction')
