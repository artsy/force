_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
analytics = require '../../../lib/analytics.coffee'
ModalPageView = require '../../../components/modal/page.coffee'
BidderPosition = require '../../../models/bidder_position.coffee'
ErrorHandlingForm = require '../../../components/credit_card/client/error_handling_form.coffee'
openSpecialistModal = require '../../../components/simple_contact/specialist_feedback.coffee'
{ SESSION_ID } = require('sharify').data

module.exports = class BidForm extends ErrorHandlingForm

  timesPolledForBidPlacement: 0
  maxTimesPolledForBidPlacement: 6
  errors:
    "Sale Closed to Bids": "Sorry, your bid wasn't received before the auction closed."
    connection: "Your bid didn't make it to us. Please check your network connectivity and try again."
    "Bidder not qualified to bid on this auction.": "Sorry, we could not process your bid. <br>Please contact <a href='#' class='js-contact-specialist'>Artsy staff</a> for support."

  events:
    'click .registration-form-content .avant-garde-button-black': 'placeBid'
    'click .bidding-question': 'showBiddingDialog'
    'click .js-contact-specialist' : 'openContactModal'

  initialize: ({ @saleArtwork, @bidderPositions, @submitImmediately }) ->
    @$submit = @$('.registration-form-content .avant-garde-button-black')
    @placeBid() if @submitImmediately
    @$('input.max-bid').focus() unless @submitImmediately

    # extend form's errors with our own
    @errors = _.defaults @errors, ErrorHandlingForm.prototype.errors

  openContactModal: ->
    openSpecialistModal()

  showBiddingDialog: (e) ->
    e.preventDefault()
    new ModalPageView
      width: '700px'
      pageId: 'auction-info'

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
        timeout: 30000
        success: (model, response, options) =>
          _.delay =>
            @pollForBidderPositionProcessed(model)
          , 1000
          analytics.track.funnel 'Confirmed bid on bid page'
        error: (model, response) =>
          @showError 'Error placing your bid', response
    else
      @showError "Your bid must be higher than #{@bidderPositions.minBid()}"

    analytics.track.click 'Clicked "Confirm Bid" on bid page'

  pollForBidderPositionProcessed: (bidderPosition) ->
    bidderPosition.fetch
      success: (bidderPosition) =>
        if bidderPosition.has('processed_at') or
           @timesPolledForBidPlacement > @maxTimesPolledForBidPlacement
          @showSuccessfulBidMessage()
        else
          @timesPolledForBidPlacement += 1
          _.delay =>
            @pollForBidderPositionProcessed bidderPosition
          , 1000

  showSuccessfulBidMessage: =>
    window.location = @saleArtwork.artwork().bidSuccessUrl()
