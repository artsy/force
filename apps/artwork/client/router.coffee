Backbone = require 'backbone'
ArtworkView = require './view.coffee'
DeepZoomView = require './deep_zoom.coffee'
ViewInRoomView = require './view_in_room.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ContactPartnerView = require "../../../components/contact/contact_partner.coffee"
InquiryView = require "../../../components/contact/inquiry.coffee"
ConfirmBidModal = require '../../../components/credit_card/client/confirm_bid.coffee'
ConfirmRegistrationModal = require '../../../components/credit_card/client/confirm_registration.coffee'

module.exports = class ArtworkRouter extends Backbone.Router

  routes:
    'artwork/:id': 'show'
    'artwork/:id/ask_specialist': 'inquire'
    'artwork/:id/contact-gallery': 'contactPartner'
    'artwork/:id/contact_gallery': 'contactPartner'
    'artwork/:id/confirm-bid': 'confirmBid'
    'artwork/:id/confirm-registration': 'confirmRegistration'
    'artwork/:id/inquire': 'inquire'
    'artwork/:id/view-in-room': 'viewInRoom'
    'artwork/:id/zoom': 'zoom'

  initialize: ({ @artwork }) ->
    @baseView = new ArtworkView el: $('#artwork-page'), artwork: @artwork

  # Called prior to any of the routing callbacks
  execute: ->
    @view?.remove()
    super

  show: ->
    @baseView.route 'show'
    # Skrillex easter egg
    mediator.on 'search:skrillex', => window.location = "#{@artwork.href()}/skrillex"
    mediator.on 'search:doge', => window.location = "#{@artwork.href()}/doge"

  zoom: ->
    analyticsHooks.trigger 'artwork:zoom'
    @baseView.route 'zoom'
    @view = new DeepZoomView
      artwork: @artwork
      image: @artwork.related().images.active()
    $('#artwork-deep-zoom-container').html @view.render().$el

  viewInRoom: ->
    analyticsHooks.trigger 'artwork:view-in-room'
    @baseView.route 'view-in-room'

    # Ensure we only view the default image in the room
    unless @artwork.related().images.active().get('is_default')
      $('.artwork-additional-image').first().click()

    @view = new ViewInRoomView $container: $('#artwork-view-in-room-container'), $img: $('#the-artwork-image'), artwork: @artwork
    @view.render()

  contactPartner: ->
    analyticsHooks.trigger 'artwork:contact-gallery'
    new ContactPartnerView artwork: @artwork, partner: @artwork.get('partner')
    mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)

  inquire: ->
    analyticsHooks.trigger 'artwork:contact-specialist'
    new InquiryView artwork: @artwork
    mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)

  fetchUser: (success) =>
    @currentUser = CurrentUser.orNull()
    @currentUser.fetch success: success if @currentUser

  confirmBid: ->
    @fetchUser =>
      new ConfirmBidModal artwork: @artwork, paddleNumber: @currentUser.get('paddle_number')
      mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)

  confirmRegistration: ->
    @fetchUser =>
      @artwork.related().sales.fetch success: (sales) =>
        auction = sales.where(is_auction: true)[0]
        new ConfirmRegistrationModal auction: auction
        mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)
        analyticsHooks.trigger 'artwork:confirm-registration'
