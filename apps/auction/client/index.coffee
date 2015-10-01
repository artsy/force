{ FEATURE, AUCTION, ARTWORKS, CURRENT_USER, USER } = require('sharify').data
Feature = require '../../../models/feature.coffee'
Auction = require '../../../models/auction.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artworks = require '../../../collections/artworks.coffee'
SaleArtworks = require '../../../collections/sale_artworks.coffee'
SpecialistView = require '../../../components/contact/general_specialist.coffee'
EmailView = require '../../../components/email/view.coffee'
AuthModalView = require '../../../components/auth_modal/view.coffee'
ConfirmRegistrationModal = require '../../../components/credit_card/client/confirm_registration.coffee'
AuctionArtworksView = require '../../../components/auction_artworks/view.coffee'
setupClocks = require './clocks.coffee'

module.exports.init = ->
  feature = new Feature FEATURE
  auction = new Auction AUCTION
  artworks = new Artworks ARTWORKS
  user = new CurrentUser USER

  # If we are on the confirm-registration path then pop up a modal
  # Page is otherwise unchanged
  if window.location.pathname.match('/confirm-registration') and USER?
    new ConfirmRegistrationModal paddleNumber: user.get('paddle_number')

  new AuctionArtworksView el: $('.js-auction-artworks-section'), model: auction, collection: artworks, user: user

  (new EmailView el: $('.auction-preview-sidebar-email'), buttonText: 'Notify me', autofocus: true).render()

  # Re-fetch due to cache
  saleArtworks = new SaleArtworks [], id: auction.id
  saleArtworks.fetchUntilEndInParallel success: ->
    artworks.reset Artworks.__fromSale__ saleArtworks

  setupClocks [auction, auction.related().sale]

  $('.js-specialist-contact-link').click (e) ->
    e.preventDefault()
    new SpecialistView

  $('.js-register-button').click (e) ->
    return if CURRENT_USER?
    e.preventDefault()
    new AuthModalView
      width: '500px'
      mode: 'register'
      copy: 'Sign up to bid on artworks'
      redirectTo: auction.registerUrl()

  require('./analytics.coffee')(feature)
