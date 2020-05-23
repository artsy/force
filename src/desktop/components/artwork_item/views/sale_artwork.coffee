_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
ContactPartnerView = require '../../contact/contact_partner.coffee'
{ openAuthModal } = require '../../../lib/openAuthModal'
{ ModalType } = require "../../../../v2/Components/Authentication/Types"
{ Intent } = require "@artsy/cohesion"

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
    new ContactPartnerView artwork: @model, partner: @model.related().partner

  bid: (e) ->
    # FIXME: Maybe not used?
    unless @currentUser
      e.preventDefault()
      openAuthModal(ModalType.signup, {
        copy: 'Sign up to bid'
        intent: Intent.bid
        redirectTo: @sale.redirectUrl @model
      })

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
