Backbone = require 'backbone'
ArtworkView = require './view.coffee'
DeepZoomView = require '../../../components/deep_zoom/view.coffee'
ViewInRoomView = require '../../../components/view_in_room/view.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
User = require '../../../models/user.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
openInquiryQuestionnaireFor = require '../../../components/inquiry_questionnaire/index.coffee'
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
    @user ?= User.instantiate()
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
    image = @artwork.related().images.active()
    if image.canDeepZoom()
      @view = new DeepZoomView image: image.deepZoomJson()
      $('body').prepend @view.render().$el
      @view.once 'removed', =>
        Backbone.history.navigate @artwork.href(),
          trigger: true
          replace: true

  viewInRoom: ->
    analyticsHooks.trigger 'artwork:view-in-room'
    @baseView.route 'view-in-room'

    # Ensure we only view the default image in the room
    unless @artwork.related().images.active().get('is_default')
      $('.artwork-additional-image').first().click()

    @view = new ViewInRoomView
      $img: $('#the-artwork-image')
      dimensions: @artwork.dimensions metric: 'cm', format: 'decimal'

    $('body').prepend @view.render().$el

    @view.once 'removed', =>
      Backbone.history.navigate @artwork.href(),
        trigger: true
        replace: true

  contactPartner: ->
    analyticsHooks.trigger 'artwork:inquiry-from-url'

    inquiry = new ArtworkInquiry notification_delay: @delayBy

    if @artwork
      openInquiryQuestionnaireFor
        user: @user
        artwork: @artwork
        inquiry: inquiry

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
    @artwork.related().sales.fetch success: (sales) =>
      auction = sales.where(is_auction: true)[0]
      new ConfirmRegistrationModal auction: auction
      mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)
      analyticsHooks.trigger 'artwork:confirm-registration'
