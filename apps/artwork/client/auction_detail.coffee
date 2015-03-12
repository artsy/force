_ = require 'underscore'
{ formatMoney } = require 'accounting'
ModalView = require '../../../components/modal/view.coffee'
buyersPremium = require '../../../components/buyers_premium/index.coffee'
Partner = require '../../../models/partner.coffee'
Profile = require '../../../models/profile.coffee'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
template = -> require('../templates/auction_detail.jade') arguments...

class BuyersPremiumModal extends ModalView

  template: ->

  initialize: ({ @auction }) ->
    super width: 700

  postRender: ->
    @isLoading()
    buyersPremium @auction, (err, html) =>
      @$('.modal-body').html html
      @updatePosition()
      @isLoaded()


module.exports = class AuctionDetailView extends Backbone.View
  template: template

  events:
    'submit form': 'submit'
    'click #artwork-buyers-premium-link a': 'openBuyersPremiumModal'

  initialize: (options) ->
    { @user, @auction, @saleArtwork, @bidderPositions } = options

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
    $('#artwork-lot-number').html 'Lot ' + num if num = @saleArtwork.get('lot_number')
    @renderPartnerLogo()
    @

  openBuyersPremiumModal: (e) ->
    e.preventDefault()
    new BuyersPremiumModal auction: @auction

  renderPartnerLogo: ->
    new Partner(@saleArtwork.artwork().get 'partner').fetch
      error: => $('#artwork-auction-logo').remove()
      success: (partner) =>
        new Profile(id: partner.get 'default_profile_id').fetch
          error: => $('#artwork-auction-logo').remove()
          success: (prof) =>
            $('#artwork-auction-logo').css(
              'background-image': "url(#{prof.icon().imageUrl()})"
            )
