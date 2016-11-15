{ FEATURE, AUCTION, ARTWORKS, USER } = require('sharify').data
Feature = require '../../../models/feature.coffee'
Auction = require '../../../models/auction.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artworks = require '../../../collections/artworks.coffee'
SaleArtworks = require '../../../collections/sale_artworks.coffee'
ConfirmRegistrationModal = require '../../../components/credit_card/client/confirm_registration.coffee'
AuctionArtworksView = require '../../../components/auction_artworks/view.coffee'
mediator = require '../../../lib/mediator.coffee'
setupClocks = require './clocks.coffee'
EmailRegistrationView = require './email_registration.coffee'
MyActiveBids = require '../../../components/my_active_bids/view.coffee'
AddToCalendar = require '../../../components/add_to_calendar/index.coffee'
myActiveBidsTemplate = -> require('../templates/my_active_bids.jade') arguments...

module.exports.init = ->
  feature = new Feature FEATURE
  auction = new Auction AUCTION
  artworks = new Artworks ARTWORKS
  user = new CurrentUser(USER) if USER

  # If we are on the confirm-registration path then pop up a modal
  # Page is otherwise unchanged
  if window.location.pathname.match('/confirm-registration') and user?
    new ConfirmRegistrationModal auction: auction

  new AuctionArtworksView
    el: $('.js-auction-artworks-section')
    model: auction
    collection: artworks
    user: user

  new MyActiveBids(
    user: user
    el: $('.auction-my-active-bids')
    template: myActiveBidsTemplate
    saleId: auction.get '_id'
  ).start()

  new AddToCalendar el: $('.auction-callout')

  # Re-fetch due to cache
  saleArtworks = new SaleArtworks [], id: auction.id
  saleArtworks.fetchUntilEndInParallel success: ->
    artworks.reset Artworks.__fromSale__ saleArtworks

  setupClocks [auction, auction.related().sale]

  $('.js-register-button').click (e) ->
    return if user
    e.preventDefault()
    mediator.trigger 'open:auth',
      mode: 'register'
      redirectTo: $(e.target).attr('href')
