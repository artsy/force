{ extend } = require 'underscore'
ArtworkAuctionView = require './view.coffee'
Sticky = require '../../../../components/sticky/index.coffee'

module.exports = ->
  $el = $('.js-artwork-auction-container')

  return unless $el.length

  view = new ArtworkAuctionView
    el: $el.find '.js-artwork-auction'

  sticky = new Sticky
  sticky.add $el
