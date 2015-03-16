{ AUCTION, ARTWORKS, CURRENT_USER, USER } = require('sharify').data
Auction = require '../../../models/auction.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artworks = require '../../../collections/artworks.coffee'
SaleArtworks = require '../../../collections/sale_artworks.coffee'
ClockView = require '../../../components/clock/view.coffee'
SpecialistView = require '../../../components/contact/general_specialist.coffee'
AuthModalView = require '../../../components/auth_modal/view.coffee'
ConfirmRegistrationModal = require '../../../components/credit_card/client/confirm_registration.coffee'
AuctionArtworksView = require './view.coffee'

module.exports.init = ->
  auction = new Auction AUCTION
  artworks = new Artworks ARTWORKS
  user = new CurrentUser USER

  # If we are on the confirm-registration path then pop up a modal
  # Page is otherwise unchanged
  if window.location.pathname.match('/confirm-registration') and USER?
    new ConfirmRegistrationModal paddleNumber: user.get('paddle_number')

  new AuctionArtworksView el: $('.js-auction-artworks-section'), model: auction, collection: artworks, user: user

  # Re-fetch due to cache
  saleArtworks = new SaleArtworks [], id: auction.id
  saleArtworks.fetchUntilEndInParallel success: ->
    artworks.reset Artworks.__fromSale__ saleArtworks

  clock = new ClockView el: $('.js-auction-clock'), model: auction, modelName: 'Auction'
  clock.start()

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
