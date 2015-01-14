_ = require 'underscore'
sd = require('sharify').data
Sales = require '../../../collections/sales.coffee'
Artworks = require '../../../collections/artworks.coffee'
Clock = require '../../../components/clock/view.coffee'
ModalPageView = require '../../../components/modal/page.coffee'

module.exports.init = ->
  currentAuctions = new Sales sd.CURRENT_AUCTIONS

  # Setup clocks
  $clocks = $('.af-clock')
  currentAuctions.map (auction) ->
    clock = new Clock modelName: 'Auction', model: auction, el: $clocks.filter("[data-id='#{auction.id}']")
    clock.start()

  # Setup fillwidth
  $artworks = $('.af-artworks')
  _.map sd.ARTWORK_DIMENSIONS, ({ id, dimensions }) ->
    $set = $artworks.filter("[data-id='#{id}']")
    $set.fillwidth
      imageDimensions: dimensions
      afterFillWidth: ->
        $set.addClass 'is-fade-in'

  # Page modal
  $('.auctions-learn-link').click (e) ->
    e.preventDefault()
    new ModalPageView width: '700px', pageId: 'auction-info'
