_                  = require 'underscore'
Backbone           = require 'backbone'
sd                 = require('sharify').data
analytics          = require '../../../lib/analytics.coffee'
ModalPageView      = require '../../../components/modal/page.coffee'
BidderPosition     = require '../../../models/bidder_position.coffee'
ErrorHandlingForm  = require('../../../components/credit_card/client/error_handling_form.coffee')
{ unformat }       = require 'accounting'
{ SESSION_ID }     = require('sharify').data

module.exports = class BidForm extends ErrorHandlingForm

  timesPolledForBidPlacement: 0
  maxTimesPolledForBidPlacement: 8

  events:
    'click .registration-form-content .avant-garde-button' : 'placeBid'
    'click .bidding-question' : 'showBiddingDialog'

  showBiddingDialog: (e) ->
    e.preventDefault()
    new ModalPageView
      width  : '700px'
      pageId : 'auction-info'

  initialize: (options) ->
    @saleArtwork = options.saleArtwork
    @$submit = @$('.registration-form-content .avant-garde-button')
    if options.submitImmediately
      @placeBid()

  getBidAmount: =>
    val = @$('input.max-bid').val()
    if val
      unformat(val) * 100

  placeBid: =>
    @timesPolledForBidPlacement = 0
    @$submit.addClass('is-loading')
    bidderPosition = new BidderPosition
      sale_id              : @model.get('id')
      artwork_id           : @saleArtwork.get('artwork').id
      max_bid_amount_cents : @getBidAmount()
    bidderPosition.save null,
      success   : =>
        @pollForBidPlacement(@model.get('minimum_next_bid_cents'))
      error     : @showError

  pollForBidPlacement: (minimumBidAmountInCents) ->
    @saleArtwork.fetch
      success: (saleArtwork) =>
        if @saleArtwork.get('highest_bid_amount_cents') >= minimumBidAmountInCents or @timesPolledForBidPlacement > @maxTimesPolledForBidPlacement
          @showSuccessfulBidMessage()
        else
          _.delay =>
            @pollForBidPlacement minimumBidAmountInCents
          , 1000
        @timesPolledForBidPlacement = @timesPolledForBidPlacement + 1

  showSuccessfulBidMessage: =>
    window.location = @saleArtwork.artwork().bidSuccessUrl()

  showErrors: (errors) =>
    @$('.errors').show().html errors.join('<br />')
    @$submit.removeClass 'is-loading'
