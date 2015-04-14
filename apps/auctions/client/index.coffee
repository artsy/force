{ CURRENT_AUCTIONS, UPCOMING_AUCTIONS } = require('sharify').data
Auctions = require '../../../collections/auctions.coffee'
Clock = require '../../../components/clock/view.coffee'
ModalPageView = require '../../../components/modal/page.coffee'
AuthModalView = require '../../../components/auth_modal/view.coffee'

setupClocks = ($clocks, auctions) ->
  auctions.map (auction) ->
    new Clock(modelName: 'Auction', model: auction, el: $clocks.filter("[data-id='#{auction.id}']"))
      .start()

module.exports.init = ->
  currentAuctions = new Auctions CURRENT_AUCTIONS
  setupClocks $('.af-clock'), currentAuctions

  upcomingAuctions = new Auctions UPCOMING_AUCTIONS
  setupClocks $('.js-apu-clock'), upcomingAuctions

  $('.js-auctions-learn-link').click (e) ->
    e.preventDefault()
    new ModalPageView width: '700px', pageId: 'auction-info'

  $('.js-sign-up-button').click (e) ->
    e.preventDefault()
    new AuthModalView width: '500px', mode: 'register'
