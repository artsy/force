_ = require 'underscore'
sd = require('sharify').data
Sales = require '../../../collections/sales.coffee'
Artworks = require '../../../collections/artworks.coffee'
Clock = require '../../../components/auction_clock/view.coffee'
ModalPageView = require '../../../components/modal/page.coffee'

module.exports.init = ->
  # Setup clocks
  $clocks = $('.af-clock')
  sales = new Sales sd.AUCTIONS
  sales.map (sale) ->
    clock = new Clock modelName: 'Auction', model: sale, el: $clocks.filter("[data-id='#{sale.id}']")
    clock.start()

  # Page modal
  $('.auctions-learn-link').click (e) ->
    e.preventDefault()
    new ModalPageView width: '700px', pageId: 'auction-info'
