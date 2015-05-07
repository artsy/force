Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
BuyersPremiumModal = require './buyers_premium_modal.coffee'
ContactView = require '../contact/view.coffee'
defaultMessage = require '../../../../components/contact/default_message.coffee'
PartnerPhoneNumberView = require '../partner_phone_number/view.coffee'
template = -> require('./template.jade') arguments...

module.exports = class AuctionDetailView extends Backbone.View
  template: template

  events:
    'submit .js-artwork-bid-form': 'submit'
    'click #artwork-buyers-premium-link a': 'openBuyersPremiumModal'

  initialize: ({ @artwork, @user, @auction, @saleArtwork, @bidderPositions }) ->
    @partner = @artwork.related().partner
    @locations = @partner.related().locations

    @partnerPhoneNumberView = new PartnerPhoneNumberView model: @artwork, collection: @locations

    if @auction.isAuctionPromo()
      new ContactView el: @$el, model: @artwork

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
      defaultMessage: defaultMessage(@artwork, @artwork.related().partner)
    ).addClass 'is-fade-in'

    $('#artwork-lot-number')
      .html 'Lot ' + num if num = @saleArtwork.get('lot_number')

    @$('.js-artwork-auction-detail-phone-number')
      .html @partnerPhoneNumberView.render().$el

    this

  openBuyersPremiumModal: (e) ->
    e.preventDefault()
    new BuyersPremiumModal auction: @auction
