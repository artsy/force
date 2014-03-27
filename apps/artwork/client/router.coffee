Backbone        = require 'backbone'
ArtworkView     = require './view.coffee'
DeepZoomView    = require './deep-zoom.coffee'
ViewInRoomView  = require './view-in-room.coffee'
analytics       = require '../../../lib/analytics.coffee'
mediator        = require '../../../lib/mediator.coffee'

ConfirmBidModal          = require '../../../components/credit_card/client/confirm_bid.coffee'
ConfirmRegistrationModal = require '../../../components/credit_card/client/confirm_registration.coffee'

module.exports = class ArtworkRouter extends Backbone.Router

  routes:
    'artwork/:id'                 : 'show'
    'artwork/:id/ask_specialist'  : 'inquire'
    'artwork/:id/contact-gallery' : 'contactPartner'
    'artwork/:id/contact_gallery' : 'contactPartner'
    'artwork/:id/confirm-bid'     : 'confirmBid'
    'artwork/:id/confirm-registration': 'confirmRegistration'
    'artwork/:id/inquire'         : 'inquire'
    'artwork/:id/more-info'       : 'moreInfo'
    'artwork/:id/view-in-room'    : 'viewInRoom'
    'artwork/:id/zoom'            : 'zoom'

  initialize: (options) ->
    { @artwork, @artist } = options
    @baseView = new ArtworkView el: $('#artwork-page'), artwork: @artwork, artist: @artist

    if analytics.abTest 'ab:inquiry', 0.8
      @ContactPartnerView = require "../../../components/contact/contact_partner.coffee"
      @InquiryView = require "../../../components/contact/inquiry.coffee"
    else
      @ContactPartnerView = require "../../../components/contact2/contact_partner.coffee"
      @InquiryView = require "../../../components/contact2/inquiry.coffee"

  # Called prior to any of the routing callbacks
  execute: ->
    @view?.remove()
    super

  show: ->
    @baseView.route 'show'
    # Skrillex easter egg
    mediator.on 'search:skrillex', => window.location = "#{@artwork.href()}/skrillex"

  zoom: ->
    analytics.track.click 'Clicked to zoom in on artwork'
    @baseView.route 'zoom'
    @view = new DeepZoomView $container: $('#artwork-deep-zoom-container'), artwork: @artwork
    @view.render()

  moreInfo: ->
    return unless @artwork.hasMoreInfo()
    analytics.track.click "Viewed 'More Info'"
    @baseView.route 'more-info'

  viewInRoom: ->
    analytics.track.click "Entered 'View In Room'"
    @baseView.route 'view-in-room'

    # Ensure we only view the default image in the room
    if @artwork.activeImage().id isnt @artwork.defaultImage().id
      $('.artwork-additional-image').first().click()

    @view = new ViewInRoomView $container: $('#artwork-view-in-room-container'), $img: $('#the-artwork-image'), artwork: @artwork
    @view.render()

  contactPartner: ->
    analytics.track.click "Clicked 'Contact Gallery'"
    new @ContactPartnerView artwork: @artwork, partner: @artwork.get('partner')
    mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)

  inquire: ->
    analytics.track.click "Clicked 'Contact Artsy Specialist'"
    new @InquiryView artwork: @artwork
    mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)

  confirmBid: ->
    analytics.track.click "Showed 'Confirm bid on artwork page'"
    new ConfirmBidModal artwork: @artwork
    mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)

  confirmRegistration: ->
    analytics.track.click "Showed 'Confirm registration on artwork page'"
    new ConfirmRegistrationModal artwork: @artwork
    mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)
