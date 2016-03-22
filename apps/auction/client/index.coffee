{ FEATURE, AUCTION, ARTWORKS } = require('sharify').data
Feature = require '../../../models/feature.coffee'
Auction = require '../../../models/auction.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artworks = require '../../../collections/artworks.coffee'
SaleArtworks = require '../../../collections/sale_artworks.coffee'
openSpecialistModal = require '../../../components/simple_contact/specialist_feedback.coffee'
ConfirmRegistrationModal = require '../../../components/credit_card/client/confirm_registration.coffee'
AuctionArtworksView = require '../../../components/auction_artworks/view.coffee'
setupClocks = require './clocks.coffee'
EmailRegistrationView = require './email_registration.coffee'
attachCTA = require './cta.coffee'
MyActiveBids = require '../../../components/my_active_bids/view.coffee'
myActiveBidsTemplate = -> require('../templates/my_active_bids.jade') arguments...

module.exports.init = ->
  feature = new Feature FEATURE
  auction = new Auction AUCTION
  artworks = new Artworks ARTWORKS
  user = CurrentUser.orNull()

  # If we are on the confirm-registration path then pop up a modal
  # Page is otherwise unchanged
  if window.location.pathname.match('/confirm-registration') and user?
    new ConfirmRegistrationModal auction: auction

  new AuctionArtworksView
    el: $('.js-auction-artworks-section')
    model: auction
    collection: artworks
    user: user

  new EmailRegistrationView(
    el: $('.auction-preview-sidebar-email')
    auction: auction
  ) unless user
  attachCTA auction, user

  new MyActiveBids(
    user: user
    el: $('.auction-my-active-bids')
    template: myActiveBidsTemplate
  ).start()

  # Re-fetch due to cache
  saleArtworks = new SaleArtworks [], id: auction.id
  saleArtworks.fetchUntilEndInParallel success: ->
    artworks.reset Artworks.__fromSale__ saleArtworks

  setupClocks [auction, auction.related().sale]

  $('.js-specialist-contact-link').click (e) ->
    e.preventDefault()
    openSpecialistModal()
