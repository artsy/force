{ CURRENT_AUCTIONS, UPCOMING_AUCTIONS } = require('sharify').data
Auctions = require '../../../collections/auctions'
Clock = require '../../../components/clock/view'
ModalPageView = require '../../../components/modal/page'
AuthModalView = require '../../../components/auth_modal/view'
MyActiveBids = require '../../../components/my_active_bids/view'
CurrentUser = require '../../../models/current_user'
myActiveBidsTemplate = -> require('../templates/my_active_bids.jade') arguments...

setupClocks = ($clocks, auctions) ->
  auctions.map (auction) ->
    new Clock(modelName: 'Auction', model: auction, el: $clocks.filter("[data-id='#{auction.id}']"))
      .start()

module.exports.init = ->
  user = CurrentUser.orNull()

  currentAuctions = new Auctions CURRENT_AUCTIONS
  setupClocks $('.af-clock'), currentAuctions

  upcomingAuctions = new Auctions UPCOMING_AUCTIONS
  setupClocks $('.js-apu-clock'), upcomingAuctions

  new MyActiveBids(
    user: user
    el: $('.auctions-my-active-bids')
    template: myActiveBidsTemplate
  ).start()

  $('.js-auctions-learn-link').click (e) ->
    e.preventDefault()
    new ModalPageView width: '700px', pageId: 'auction-info'

  $('.js-sign-up-button').click (e) ->
    e.preventDefault()
    new AuthModalView width: '500px', mode: 'register'
