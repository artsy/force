_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
AcquireArtwork = require('../../acquire/view').acquireArtwork
ContactPartnerView = require '../../contact/contact_partner'
mediator = require '../../../lib/mediator'

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
