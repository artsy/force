{ defer, extend, before, isEqual } = require 'underscore'
Backbone = require 'backbone'
{ AUCTION, CURRENT_USER } = require('sharify').data
Form = require '../../../../components/form/index.coffee'
openMultiPageModal = require '../../../../components/multi_page_modal/index.coffee'
openBuyersPremiumModal = require './components/buyers_premium/index.coffee'
mediator = require '../../../../lib/mediator.coffee'
inquire = require '../../lib/inquire.coffee'
acquire = require '../../lib/acquire.coffee'
helpers = require './helpers.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
template = -> require('./templates/index.jade') arguments...

LOT_STANDING_MAX_POLLS = 10
LOT_STANDING_POLL_INTERVAL = 1000

module.exports = class ArtworkAuctionView extends Backbone.View
  className: 'artwork-auction'

  events:
    'click .js-artwork-auction-buyers-premium': 'openBuyersPremium'
    'click .js-artwork-auction-bid-button': 'submit'
    'click .js-artwork-auction-help-modal': 'openHelpModal'
    'click .js-artwork-auction-ask-specialist': 'inquire'
    'click .js-artwork-auction-buy-now': 'acquire'
    'change .js-artwork-auction-max-bid': 'setMaxBid'

  initialize: ({ @data }) -> #
    # Defer until next tick. This really just gets the sequence right for
    # testing to work. This doesn't feel like a great justification, though.
    setTimeout (=> @updateBidLabel LOT_STANDING_MAX_POLLS), 0

  openBuyersPremium: (e) ->
    e.preventDefault()

    openBuyersPremiumModal AUCTION.id

  parseBid: (amount = '') ->
    [dollars, cents] = String amount
      .split '.'

    dollars = dollars.replace /\D/g,''

    (parseInt(dollars) * 100) + parseInt(cents or 0)

  validBid: (cents) ->
    cents >= AUCTION.minimum_next_bid.cents

  openHelpModal: (e) ->
    e.preventDefault()

    id = $(e.currentTarget).data 'id'

    openMultiPageModal 'auction-faqs', ({ view }) ->
      view.subView.state
        .set 'active', id

  inquire: (e) ->
    e.preventDefault()
    inquire AUCTION.artwork_id

  acquire: (e) ->
    e.preventDefault()

    $target = $(e.currentTarget)
    $target.attr 'data-state', 'loading'

    acquire AUCTION.artwork_id
      .catch ->
        $target.attr 'data-state', 'error'
        location.reload()

  redirectTo: (path) ->
    location.assign path

  submit: (e) ->
    e.preventDefault()

    form = new Form $form: @$('.js-artwork-auction-bid')

    if not CURRENT_USER?
      return mediator.trigger 'open:auth',
        width: '500px',
        signupIntent: 'bid'
        mode: 'register'
        copy: 'Sign up to bid'
        redirectTo: form.action()

    return unless form.isReady()

    form.state 'loading'

    { bid } = form.data()

    if @validBid amount = @parseBid bid
      @redirectTo "#{form.action()}?bid=#{amount}"

    else
      message = "Your bid needs to be at least #{AUCTION.minimum_next_bid.display}"
      defer -> form.error message

  render: ->
    @$el.html template extend {}, @data, {
      helpers: auction: helpers
    }
    this

  setMaxBid: (e) ->
    @$('.js-artwork-auction-bid-button')
      .text "Bid #{$(e.target).find('option:selected').attr 'data-display'}"

  updateBidLabel: (remaining) ->
    metaphysics
      query: """
        query artwork($id: String!, $sale_id: String!) {
          me {
            bidders(sale_id: $sale_id) {
              qualified_for_bidding
            }
            lot_standing(artwork_id: $id, sale_id: $sale_id) {
              is_leading_bidder
              most_recent_bid {
                max_bid {
                  cents
                }
              }
            }
          }
          artwork(id: $id) {
            ... auction
          }
        }
        #{require './query.coffee'}
      """
      variables: id: AUCTION.artwork_id, sale_id: AUCTION.id
      req: user: CURRENT_USER
    .then (data) =>
      old_data = @data
      @data = extend data, user: CURRENT_USER?

      @render() unless isEqual(old_data, data)

      @delayedUpdateBidLabel(remaining - 1) if remaining > 0

    .catch console.error.bind console

  delayedUpdateBidLabel: (remaining) ->
    setTimeout (=> @updateBidLabel remaining), LOT_STANDING_POLL_INTERVAL
