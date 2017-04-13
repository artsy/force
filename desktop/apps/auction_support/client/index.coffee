_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Sale = require '../../../models/sale.coffee'
SaleArtwork = require '../../../models/sale_artwork.coffee'
BidderPosition = require '../../../models/bidder_position.coffee'
BidderPositions = require '../../../collections/bidder_positions.coffee'
RegistrationForm = require './registration_form.coffee'
BidForm = require './bid_form.coffee'
setupClocks = require './clocks.coffee'
mediator = require '../../../lib/mediator.coffee'


module.exports.AuctionRouter = class AuctionRouter extends Backbone.Router

  routes:
    'auction-registration/:id': 'register'
    'auction/:id/bid/:artwork': 'bid'

  initialize: (options) ->
    { @sale, @saleArtwork, @registered, @bidderPositions } = options

  register: ->
    new RegistrationForm
      el: $('#auction-registration-page')
      model: @sale
      success: =>
        window.location = @sale.registrationSuccessUrl()

  bid: ->
    if @registered
      @initBidForm()
    else
      new RegistrationForm
        el: $('#auction-registration-page')
        model: @sale
        comboForm: true
        success: => @initBidForm(true)

  initBidForm: (submitImmediately=false) =>
    new BidForm
      el: $('#auction-registration-page')
      model: @sale
      saleArtwork: @saleArtwork
      bidderPositions: @bidderPositions
      submitImmediately: submitImmediately

module.exports.init = ->
  new AuctionRouter
    sale: sale = new Sale sd.SALE
    saleArtwork: saleArtwork = new SaleArtwork sd.SALE_ARTWORK
    bidderPositions: new BidderPositions(sd.BIDDER_POSITIONS,
      { sale: sale, saleArtwork: saleArtwork })
    registered: sd.REGISTERED

  Backbone.history.start(pushState: true)

  setupClocks [sale]

  mediator.once 'clock:is-almost-over', ->
    $('.js-auction-clock').addClass 'is-almost-over'

  mediator.once 'clock:is-over', ->
    $('.auction-bid-form-confirm.avant-garde-button-black').addClass 'is-disabled'
