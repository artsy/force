_ = require 'underscore'
{ formatMoney } = require 'accounting'
ModalPageView = require '../../../components/modal/page.coffee'
Partner = require '../../../models/partner.coffee'
Profile = require '../../../models/profile.coffee'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
template = -> require('../templates/auction_detail.jade') arguments...

class BuyersPremiumModal extends ModalPageView

  initialize: ({ @auction }) ->
    super width: '700px', pageId: 'buyers-premium'

  isLoaded: ->
    super
    max = _.max _.pluck @auction.get('buyers_premium').schedule, 'min_amount_cents'
    [hammerPerc, portionPerc] = _.pluck @auction.get('buyers_premium').schedule, 'percent'
    @$('.markdown-content').append """
      <ul class='artwork-bp-schedule'>
        <li>
          <div class='artwork-bp-pre'>On the hammer price up to and including \
            #{formatMoney(max / 100, '$', 0)}</div>
          <div class='artwork-bp-dots'></div>
          <div class='artwork-bp-perc'>#{hammerPerc * 100}%</div>
        </li>
        <li>
          <div class='artwork-bp-pre'>On the portion of the hammer price in excess of \
            #{formatMoney(max / 100, '$', 0)}</div>
          <div class='artwork-bp-dots'></div>
          <div class='artwork-bp-perc'>#{portionPerc * 100}%</div>
        </li>
      </ul>
    """

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
    @
    $('#artwork-lot-number').html 'Lot ' + num if num = @saleArtwork.get('lot_number')
    @renderPartnerLogo()

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
