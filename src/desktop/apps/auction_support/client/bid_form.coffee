_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
ModalPageView = require '../../../components/modal/page.coffee'
BidderPosition = require '../../../models/bidder_position.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ErrorHandlingForm = require '../../../components/credit_card/client/error_handling_form.coffee'
ConditionsOfSale = require '../mixins/conditions_of_sale.js'
{ SESSION_ID, APP_URL } = require('sharify').data
{ getLiveAuctionUrl } = require '../../../../utils/domain/auctions/urls.js'

module.exports = class BidForm extends ErrorHandlingForm
  _.extend @prototype, ConditionsOfSale

  timesPolledForBidPlacement: 0
  maxTimesPolledForBidPlacement: sd.MAX_POLLS_FOR_MAX_BIDS
  errors: -> {
    "Sale Closed to Bids": "Sorry, your bid wasn't received before the auction closed."
    "Live Bidding has Started": "Sorry, your bid wasn't received before live bidding started. <br/>To continue bidding, please <a href=\"#{getLiveAuctionUrl(@model.get('id'), {isLoggedIn: Boolean(@user)} )}\">join the live auction</a>."
    connection: "Your bid didn't make it to us. Please check your network connectivity and try again."
    "Bidder not qualified to bid on this auction.": "Sorry, we could not process your bid. <br>Please contact <a href='#' class='js-contact-specialist'>Artsy staff</a> for support."
  }

  events:
    'click .registration-form-content .avant-garde-button-black': 'placeBid'
    'click .bidding-question': 'showBiddingDialog'
    'change .registration-form-section__checkbox': 'validateAcceptConditions'

  initialize: ({ @saleArtwork, @bidderPositions, @submitImmediately, @isRegistered }) ->
    @user = CurrentUser.orNull()
    @$submit = @$('.registration-form-content .avant-garde-button-black')
    @$acceptConditions = @$('#accept_conditions')
    @$conditionsCheckbox = @$('.artsy-checkbox')
    @placeBid() if @submitImmediately
    @$('.max-bid').focus() unless @submitImmediately
    @errors = _.defaults @errors, ErrorHandlingForm.prototype.errors

  showBiddingDialog: (e) ->
    e.preventDefault()
    new ModalPageView
      width: '700px'
      pageId: 'auction-info'

  getBidAmount: =>
    val = @$('.max-bid').val()
    @saleArtwork.cleanBidAmount val if val

  placeBid: =>
    unless @isRegistered
      return unless @validateAcceptConditions()
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
        error: (model, response) =>
          if response.responseJSON?.error == "Bidder not qualified to bid on this auction"
            # Trigger the registration confirmation modal on the auction page
            # with the 'bid could not be placed' registration pending message
            bidPendingUrl = "#{APP_URL}/auction/#{@model.get('id')}/confirm-registration?origin=bid"
            window.location = bidPendingUrl
          else
            @showError 'Error placing your bid', response
    else
      @showError "Your bid must be higher than #{@bidderPositions.minBid()}"

  pollForBidderPositionProcessed: (bidderPosition) ->
    bidderPosition.fetch
      success: (bidderPosition) =>
        if bidderPosition.has('processed_at')
          if bidderPosition.get('active')
            analyticsHooks.trigger 'confirm:bid:form:success', {
              bidder_position_id: bidderPosition.id
              bidder_id: bidderPosition.get('bidder')?.id
              max_bid_amount_cents: bidderPosition.get('max_bid_amount_cents')
            }
            @showSuccessfulBidMessage()
          else
            @showError "You've been outbid, increase your bid"
        else if @timesPolledForBidPlacement > @maxTimesPolledForBidPlacement
          @showError "We’re receiving a high volume of traffic and your bid is still processing. If you don’t receive an update soon, please contact support@artsy.net."
        else
          @timesPolledForBidPlacement += 1
          _.delay =>
            @pollForBidderPositionProcessed bidderPosition
          , 1000

  showSuccessfulBidMessage: =>
    window.location = @saleArtwork.artwork().bidSuccessUrl()
