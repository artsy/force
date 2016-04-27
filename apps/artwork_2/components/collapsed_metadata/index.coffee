{ AUCTION } = require('sharify').data
inquire = require '../../lib/inquire.coffee'
ArtworkAuctionView = require '../auction/view.coffee'

module.exports = ->
  $(document).on 'ajaxStop', ->
    $.waypoints 'refresh'

  $el = $('.js-artwork-collapsed-metadata')

  $enter = $('.js-collapsed-metadata--enter')
  $enter
    .waypoint (direction) ->
      $el.attr 'data-state', direction
    , offset: -(($enter.outerHeight() + $enter.offset().top) - $el.offset().top)

  $exit = $('.js-collapsed-metadata--exit')
  $exit
    .waypoint (direction) ->
      $el.attr 'data-state', if direction is 'up' then 'down' else 'up'
    , offset: ($el.outerHeight() + $el.offset().top)

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
