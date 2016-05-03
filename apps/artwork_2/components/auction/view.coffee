{ defer, extend } = require 'underscore'
Backbone = require 'backbone'
{ AUCTION } = require('sharify').data
Form = require '../../../../components/form/index.coffee'
openMultiPageModal = require '../../../../components/multi_page_modal/index.coffee'
inquire = require '../../lib/inquire.coffee'
helpers = require './helpers.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ArtworkAuctionView extends Backbone.View
  events:
    'click .js-artwork-auction-buyers-premium': 'openBuyersPremium'
    'click .js-artwork-auction-bid-button': 'submit'
    'click .js-artwork-auction-help-modal': 'openHelpModal'
    'click .js-artwork-auction-ask-specialist': 'askSpecialist'

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

  askSpecialist: (e) ->
    e.preventDefault()

    inquire AUCTION.artwork_id

  submit: (e) ->
    e.preventDefault()

    form = new Form $form: @$('.js-artwork-auction-bid')
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
