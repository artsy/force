_ = require 'underscore'
sd = require('sharify').data
SaleArtwork = require '../../../models/sale_artwork.coffee'
Backbone = require 'backbone'
bootstrap = require '../../../components/layout/bootstrap.coffee'
ConditionsOfSale = require '../../../../desktop/apps/auction_support/mixins/conditions_of_sale.js'
openSpecialistModal = require '../../../components/specialist_modal/index.coffee'
Auction = require '../../../models/sale.coffee'
CurrentUser = require '../../../models/current_user.coffee'
mediator = require '../../../lib/mediator.coffee'
accounting = require 'accounting'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
ClockView = require '../components/clock/view.coffee'
{ countdownLabel, countdownTimestamp } = require '../helpers.coffee'

module.exports.BidPageView = class BidPageView extends Backbone.View
  _.extend @prototype, ConditionsOfSale
  timesPolledForBidPlacement: 0

  errors:
    "Sale Closed to Bids": "Sorry, your bid wasn't received before the auction closed."
    connection: "Your bid didn't make it to us. Please check your network connectivity and try again."
    "Bidder not qualified to bid on this auction.": "Sorry, we could not process your bid. <br>Please contact <a href='#' class='js-contact-specialist'>Artsy staff</a> for support."

  initialize: (options) ->
    { @saleArtwork, @user, @window, @auction, @isRegistered } = options
    @$conditionsCheckbox = @$('.artsy-checkbox')
    @$acceptConditions = @$('#accept_conditions')
    @$submit = @$('.feature-bid-page-max-bid .avant-garde-box-button')
    @renderUnqualifiedWarning()

  inputValCents: ->
    @$('.feature-bid-page-max-bid-select').val()

  events:
    'submit form': 'onSubmit'
    'click .js-contact-specialist' : 'openSpecialistView'
    'change .feature-bid-page-max-bid-select': 'updateButtonText'
    'change .registration-form-section__checkbox': 'validateAcceptConditions'

  openSpecialistView: ->
    openSpecialistModal(@$el)

  onSubmit: (e) ->
    e.preventDefault()
    unless @isRegistered
      return unless @validateAcceptConditions()
    @$('button').addClass('avant-garde-box-button-loading')
    if @inputValCents() < @saleArtwork.get('minimum_next_bid_cents')
      @onError "Your bid must be at least #{@saleArtwork.minBid()}"
    else
      @submitBid()
    false

  submitBid: ->
    $('#feature-bid-page-errors').hide()
    @timesPolledForBidPlacement = 0
    @user.placeBid
      artwork_id: @saleArtwork.get('artwork').id
      sale_id: @saleArtwork.get('sale').id
      max_bid_amount_cents: @inputValCents()
    ,
      success: (model) =>
        @pollForBidderPositionProcessed model.id,
          success: =>
            @window.location = "/artwork/#{@saleArtwork.get('artwork').id}#confirm-bid"
          error: @onError
      error: (model, response) =>
        if response.responseJSON?.error == "Bidder not qualified to bid on this auction"
          # Trigger the registration confirmation modal on the (desktop) auction page
          # with the 'bid could not be placed' registration pending message

          bidPendingUrl = "#{sd.APP_URL}/auction/#{@saleArtwork.get('sale').id}/confirm-registration?origin=bid"
          @window.location = bidPendingUrl
        else
          @onError model, response

  onError: (m, err) =>
    msg = if _.isString(m) then m else JSON.parse(err.responseText).message
    # note: override with custom message if we have one
    msg = @errors[msg] || msg
    $('#feature-bid-page-errors').show().html msg
    @$('button').removeClass('avant-garde-box-button-loading')

  pollForBidderPositionProcessed: (bidderPositionId, options = {}) ->
    new Backbone.Model().fetch
      url: "#{sd.API_URL}/api/v1/me/bidder_position/#{bidderPositionId}",
      success: (bidderPosition) =>
        if bidderPosition.has('processed_at')
          if bidderPosition.get('active')
            analyticsHooks.trigger('confirm:bid', bidderPosition)
            options.success()
          else
            @onError "You've been outbid, increase your bid"
        else if @timesPolledForBidPlacement > sd.MAX_POLLS_FOR_MAX_BIDS
          @onError "We’re receiving a high volume of traffic and your bid is still processing. If you don’t receive an update soon, please contact support@artsy.net. "
        else
          @timesPolledForBidPlacement += 1
          _.delay =>
            @pollForBidderPositionProcessed bidderPosition.id, options
          , 1000
      error: options.error

  renderUnqualifiedWarning: ->
    @user.fetchBidderForAuction @auction, success: (bidder) =>
      return unless bidder and not bidder.get 'qualified_for_bidding'
      if @$('.alert').length
        $el = @$('.alert')
      else
        $('body').prepend($el = $ "<div class='alert'></div>")
      $el.append("""
        Your registration was successful but we need additional information \
        from you before you are able to place bid in this auction. A member \
        of the Artsy collector relations team will be reaching out to you \
        for this purpose shortly.
      """).attr('style', 'text-align: left')

  updateButtonText: (e) ->
    val = $('.feature-bid-page-max-bid-select option:selected').attr 'data-display'
    $('.feature-bid-page-button').html """
      Bid #{accounting.formatMoney(val, @saleArtwork.get('symbol'), 0)}
      <div class='loading-spinner'></div>
    """

module.exports.init = ->
  bootstrap()

  new BidPageView
    el: $('body')
    saleArtwork: new SaleArtwork sd.SALE_ARTWORK
    auction: new Auction sd.AUCTION
    user: new CurrentUser
    window: window
    isRegistered: sd.REGISTERED

  if { start_at, end_at, live_start_at } = sd.AUCTION
    clockView = new ClockView
      label: countdownLabel start_at, live_start_at
      timestamp: countdownTimestamp start_at, end_at, live_start_at
    clockView.start()

  $('.js-auction-clock')
    .html clockView.render().$el

  mediator.once 'clock:is-almost-over', ->
    $('.js-auction-clock').addClass 'is-almost-over'

  mediator.once 'clock:is-over', ->
    $('.avant-garde-box-button-black').attr 'disabled', true
