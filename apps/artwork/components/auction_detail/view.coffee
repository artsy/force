Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
BuyersPremiumModal = require './buyers_premium_modal.coffee'
PartnerPhoneNumberView = require '../partner_phone_number/view.coffee'
openMultiPageModal = require '../../../../components/multi_page_modal/index.coffee'
template = -> require('./template.jade') arguments...

module.exports = class AuctionDetailView extends Backbone.View
  template: template

  events:
    'submit .js-artwork-bid-form': 'submit'
    'click .js-buyers-premium': 'openBuyersPremiumModal'
    'click .js-auction-modal': 'openAuctionModal'

  initialize: ({ @artwork, @user, @auction, @saleArtwork, @bidderPositions }) ->
    @partner = @artwork.related().partner
    @locations = @partner.related().locations

  openAuctionModal: (e) ->
    e.preventDefault()
    openMultiPageModal 'auction-faqs', ({view}) ->
      view.subView.state.set 'active', $(e.currentTarget).data('id')

  submit: (e) ->
    e.preventDefault()
    unless @user
      mediator.trigger 'open:auth',
        mode: 'register'
        copy: 'Sign up to bid'
        redirectTo: @auction.redirectUrl @saleArtwork.artwork()
      return false
    else
      @$('button').attr 'data-state', 'loading'
      if (val = @validate @$('input').val())
        location.assign "#{@$('form').attr('action')}?bid=#{val}"
      else
        @displayValidationError()

  displayValidationError: ->
    @$('.abf-validation-error').show()
    @$('button').attr 'data-state', 'error'

  # Check to see if the form value is greater or equal to the minimum next bid
  # and in the process strip the formatting and return the value if it (only if it is valid)
  #
  # @return {Integer or undefined}
  validate: (val) ->
    if (val = @saleArtwork.cleanBidAmount(val)) >= @saleArtwork.get('minimum_next_bid_cents')
      val

  render: ->
    @$el.html(template
      user: @user
      auction: @auction
      saleArtwork: @saleArtwork
      artwork: @saleArtwork.artwork()
      bidderPositions: @bidderPositions
    ).addClass 'is-fade-in'

    $('#artwork-lot-number')
      .html 'Lot ' + num if num = @saleArtwork.get('lot_number')

    if @auction.isOpen()
      @partnerPhoneNumberView = new PartnerPhoneNumberView
        model: @artwork
        collection: @locations
      @$('.js-artwork-auction-detail-phone-number')
        .html @partnerPhoneNumberView.render().$el

    this

  openBuyersPremiumModal: (e) ->
    e.preventDefault()
    new BuyersPremiumModal auction: @auction
