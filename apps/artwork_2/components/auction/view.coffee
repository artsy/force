{ defer, extend } = require 'underscore'
Backbone = require 'backbone'
{ AUCTION, CURRENT_USER } = require('sharify').data
Form = require '../../../../components/form/index.coffee'
openMultiPageModal = require '../../../../components/multi_page_modal/index.coffee'
AuthModalView = require '../../../../components/auth_modal/view.coffee'
inquire = require '../../lib/inquire.coffee'
acquire = require '../../lib/acquire.coffee'
helpers = require './helpers.coffee'
template = -> require('./templates/index.jade') arguments...

module.exports = class ArtworkAuctionView extends Backbone.View
  className: 'artwork-auction'

  events:
    'click .js-artwork-auction-buyers-premium': 'openBuyersPremium'
    'click .js-artwork-auction-bid-button': 'submit'
    'click .js-artwork-auction-help-modal': 'openHelpModal'
    'click .js-artwork-auction-ask-specialist': 'inquire'
    'click .js-artwork-auction-buy-now': 'acquire'

  initialize: ({ @data }) -> #

  openBuyersPremium: (e) ->
    e.preventDefault()

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

  submit: (e) ->
    e.preventDefault()

    form = new Form $form: @$('.js-artwork-auction-bid')

    if not CURRENT_USER?
      return new AuthModalView
        width: '500px',
        mode: 'register'
        copy: 'Sign up to bid'
        destination: form.action()

    return unless form.isReady()

    form.state 'loading'

    { bid } = form.data()

    if @validBid amount = @parseBid bid
      location.assign "#{form.action()}?bid=#{amount}"

    else
      message = "Your bid needs to be at least #{AUCTION.minimum_next_bid.amount}"
      defer -> form.error message

  render: ->
    @$el.html template extend {}, @data,
      helpers: auction: helpers
    this
