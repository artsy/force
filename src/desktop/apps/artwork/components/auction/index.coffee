{ extend } = require 'underscore'
ArtworkAuctionView = require './view.coffee'

module.exports = ->
  $el = $('.js-artwork-auction-container')

  return unless $el.length

  view = new ArtworkAuctionView
    el: $el.find '.js-artwork-auction'
