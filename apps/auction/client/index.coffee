{ FEATURE, AUCTION, ARTWORKS, CURRENT_USER, USER, MAILCHIMP_WELCOME_LIST_ID } = require('sharify').data
Feature = require '../../../models/feature.coffee'
Auction = require '../../../models/auction.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artworks = require '../../../collections/artworks.coffee'
SaleArtworks = require '../../../collections/sale_artworks.coffee'
SpecialistView = require '../../../components/contact/general_specialist.coffee'
EmailView = require '../../../components/email/view.coffee'
modalize = require '../../../components/modalize/index.coffee'
AuthModalView = require '../../../components/auth_modal/view.coffee'
ConfirmRegistrationModal = require '../../../components/credit_card/client/confirm_registration.coffee'
AuctionArtworksView = require '../../../components/auction_artworks/view.coffee'
setupClocks = require './clocks.coffee'
EmailToRegistrationTransitionView = require './email_to_registration_transition.coffee'

module.exports.init = ->
  feature = new Feature FEATURE
  auction = new Auction AUCTION
  artworks = new Artworks ARTWORKS
  user = new CurrentUser USER

  # If we are on the confirm-registration path then pop up a modal
  # Page is otherwise unchanged
  if window.location.pathname.match('/confirm-registration') and USER?
    new ConfirmRegistrationModal paddleNumber: user.get('paddle_number')

  new AuctionArtworksView
    el: $('.js-auction-artworks-section')
    model: auction
    collection: artworks
    user: user

  emailView = new EmailView
    el: $('.auction-preview-sidebar-email')
    listId: MAILCHIMP_WELCOME_LIST_ID
    buttonText: 'Notify me'
    autofocus: true
    mergeVars:
      "AUCTION_#{auction.id}": true

  emailView.result
  .then (emailAddress) ->
    transitionView = new EmailToRegistrationTransitionView
    modal = modalize transitionView, dimensions: width: '400px'
    transitionView.on 'done', -> modal.close()
    modal.open()

    # Bundle together the user will make in the view with the email address they provided
    transitionView.result.then (willRegister) -> { emailAddress: emailAddress, willRegister: willRegister }
  .then ({emailAddress, willRegister}) ->
    # TODO ideally we would open this view with in the right login/sign-up
    # state based on the email, but this may not be feasible.
    authModalView = new AuthModalView { width: '500px', redirectTo: '', userData: { email: emailAddress } }

    authModalView.result.then ->
      authModalView.close()

      # Propagate the willRegister result of the transition view if login succeeds
      willRegister
  .then (willRegister) ->
    if willRegister
      # TODO Redirect to bidder registration
      console.log('bidder registration')
    else
      # TODO Redirect to onboarding
      console.log('onboarding')
  .catch ->
    window.location.reload()
  .done()



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
