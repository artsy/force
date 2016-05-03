ArtworkAuctionView = require './view.coffee'
Sticky = require '../../../../components/sticky/index.coffee'

module.exports = ->
  $el = $('.js-artwork-auction')

  return unless $el.length

  view = new ArtworkAuctionView el: $el

  sticky = new Sticky
  sticky.add $el
