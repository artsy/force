_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
analytics = require '../../../lib/analytics.coffee'
ModalPageView = require '../../../components/modal/page.coffee'
BidderPosition = require '../../../models/bidder_position.coffee'
ErrorHandlingForm = require '../../../components/credit_card/client/error_handling_form.coffee'
{ SESSION_ID } = require('sharify').data
trackSnowplow = analytics.snowplowStruct

module.exports = class BidForm extends ErrorHandlingForm

  timesPolledForBidPlacement: 0
  maxTimesPolledForBidPlacement: 6

  events:
    'click .registration-form-content .avant-garde-button-black': 'placeBid'
    'click .bidding-question': 'showBiddingDialog'

  showBiddingDialog: (e) ->
    e.preventDefault()
    new ModalPageView
      width: '700px'
      pageId: 'auction-info'

  initialize: (options) ->
    { @saleArtwork, @bidderPositions } = options
    @$submit = @$('.registration-form-content .avant-garde-button-black')
    if options.submitImmediately
      @placeBid()
    else
      # This field already has autofocus but for some reason doesn't autofocus
      @$('input.max-bid').focus()

  getBidAmount: =>
    val = @$('input.max-bid').val()
    if val
      @saleArtwork.cleanBidAmount val

  placeBid: =>
    @timesPolledForBidPlacement = 0
    @$submit.addClass('is-loading')
    @clearErrors()

    if @getBidAmount() >= @bidderPositions.minBidCents()
      bidderPosition = new BidderPosition
        sale_id: @model.get('id')
        artwork_id: @saleArtwork.get('artwork').id
        max_bid_amount_cents: @getBidAmount()
      bidderPosition.save null,
        success: (model, response, options) =>
          _.delay =>
            @pollForBidPlacement(@saleArtwork.get('minimum_next_bid_cents'))
          , 1000
          analytics.track.funnel 'Confirmed bid on bid page'
          trackSnowplow 'bid', 'confirm', @saleArtwork.artwork().get('_id'), 'artwork', undefined, { sale_id: @model.get('_id'), bid_id: model.id }
        error: (xhr) =>
          @showError 'Error placing your bid', xhr
    else
      @showError "Your bid must be higher than #{@bidderPositions.minBid()}"

    analytics.track.click 'Clicked "Confirm Bid" on bid page'

  pollForBidPlacement: (minimumBidAmountInCents) ->
    @saleArtwork.fetch
      success: (saleArtwork) =>
        if @saleArtwork.get('highest_bid_amount_cents') >= minimumBidAmountInCents or
           @timesPolledForBidPlacement > @maxTimesPolledForBidPlacement
          @showSuccessfulBidMessage()
        else
          @timesPolledForBidPlacement = @timesPolledForBidPlacement + 1
          _.delay =>
            @pollForBidPlacement minimumBidAmountInCents
          , 1000

  showSuccessfulBidMessage: =>
    window.location = @saleArtwork.artwork().bidSuccessUrl()

  showError: (description, response = {}) =>
    trackSnowplow 'bid', 'validation_error', @saleArtwork.artwork().get('_id'), 'artwork', undefined, { error_name: description }
    super
