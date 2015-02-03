_ = require 'underscore'
ModalPageView = require '../../../components/modal/page.coffee'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
template = -> require('../templates/auction_detail.jade') arguments...

module.exports = class AuctionDetailView extends Backbone.View
  template: template

  events:
    'submit form': 'submit'
    'click #artwork-buyers-premium-link': 'openBuyersPremiumModal'

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
    @

  openBuyersPremiumModal: (e) ->
    e.preventDefault()
    new ModalPageView
      width: '700px'
      pageId: 'buyers-premium'
