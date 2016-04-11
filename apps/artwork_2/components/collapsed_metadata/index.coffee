{ AUCTION } = require('sharify').data
inquire = require '../../lib/inquire.coffee'
ArtworkAuctionView = require '../auction/view.coffee'

module.exports = ->
  $el = $('.js-artwork-collapsed-metadata')

  $images = $('.js-artwork-images')
  $images
    .waypoint (direction) ->
      $el.attr 'data-state', direction
    , offset: -$images.outerHeight()

  $el
    .find '.js-artwork-collapsed-metadata-inquire'
    .click (e) ->
      e.preventDefault()
      $this = $(this)
      $this.attr 'data-state', 'loading'
      inquire $this.data 'artworkId'
        .then ->
          $this.attr 'data-state', null
        .catch ->
          $this.attr 'data-state', 'error'

  return unless AUCTION?
  new ArtworkAuctionView
    el: $el.find('.js-artwork-collapsed-metadata-auction')
