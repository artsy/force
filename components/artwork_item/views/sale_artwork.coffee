_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
AcquireArtwork = require('../../acquire/view.coffee').acquireArtwork
ContactPartnerView = require '../../contact/contact_partner.coffee'
ConfirmInquiryView = require '../../contact/confirm_inquiry.coffee'
mediator = require '../../../lib/mediator.coffee'
FlashMessage = require '../../flash/index.coffee'

module.exports = class SaleArtworkView extends Backbone.View
  events:
    'click .artwork-item-buy': 'acquire'
    'click .artwork-item-contact-seller': 'contactSeller'
    'click .artwork-item-bid': 'bid'
    'click .artwork-item-buy-now': 'acquire'

  initialize: (options = {}) ->
    { @currentUser, @sale } = options

    if @sale?.isAuction()
      if @sale.has 'clockState'
        @setupClockState()
      else
        @listenTo @sale, 'change:clockState', @setupClockState

  # Appends ?auction_id=<auction_id> to all artwork links
  appendAuctionId: ->
    @$("a[href*=#{@model.id}]").each (i, a) =>
      ($this = $(a)).attr href: "#{$this.attr 'href'}?auction_id=#{@sale.id}"

  contactSeller: (e) ->
    e.preventDefault()
    # TODO: Only show if it's coming from an artist page
    if sd.INQUIRY_FLOW is 'updated_flow'
      if @model.isPriceDisplayable()
        defaultMessage = "I'm interested in this work by #{artwork.get('artist')}. Please contact me to discuss further."
      else
        defaultMessage = "Hi. Could you please share the asking price for this work? I'd like to know if it's within my budget."
      new ConfirmInquiryView
        artwork: @model
        partner: @model.get 'partner'
        inputMessage: defaultMessage
        success: =>
          new FlashMessage message: 'Thank you. Your message has been sent.'
        error: (model, response, options) =>
          @$('#artwork-contact-form-errors').html @errorMessage(response)
        exit: ->
    else
      new ContactPartnerView
        artwork: @model
        partner: @model.get 'partner'

  acquire: (e) ->
    e.preventDefault()
    $(e.currentTarget).attr 'data-state', 'loading'
    # Redirect to artwork page if artwork has multiple editions
    if @model.get 'edition_sets_count' > 1
      return window.location.href = @model.href()
    AcquireArtwork @model, $(e.target)

  bid: (e) ->
    unless @currentUser
      e.preventDefault()
      mediator.trigger 'open:auth',
        mode: 'register'
        copy: 'Sign up to bid'
        redirectTo: @sale.redirectUrl @model

  hideBidStatuses: ->
    @$('.artwork-item-auction-bid-status').hide()

  hideBuyNowButtons: ->
    @$('.artwork-item-buy-now').hide()

  setupClockState: ->
    if @sale.isOpen()
      @appendAuctionId()
    else
      # Possibly hide the buy now button
      @hideBuyNowButtons()

    # Possibly hide the bid status
    if @sale.isClosed()
      @hideBidStatuses()

    # Set bid button state
    # Set button state
    $button = @$('.artwork-item-bid')
    state = @sale.bidButtonState @currentUser, @model
    $button.
      text(state.label).
      addClass(state.classes).
      attr href: state.href, disabled: !state.enabled
