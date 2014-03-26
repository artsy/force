_                = require 'underscore'
sd               = require('sharify').data
Backbone         = require 'backbone'
CurrentUser      = require '../../../models/current_user.coffee'
Sale             = require '../../../models/sale.coffee'
SaleArtwork      = require '../../../models/sale_artwork.coffee'
RegistrationForm = require './registration_form.coffee'
BidForm          = require './bid_form.coffee'

module.exports.AuctionRouter = class AuctionRouter extends Backbone.Router

  routes:
    'auction-registration/:id'     : 'register'
    'feature/:id/bid/:artwork' : 'bid'

  initialize: (options) ->
    { @sale, @saleArtwork, @registered } = options

  register: ->
    new RegistrationForm
      el: $('#auction-registration-page')
      model: @sale
      success: =>
        window.location = @sale.registrationSuccessUrl()

  bid: ->
    if @registered
      new BidForm
        el: $('#auction-registration-page')
        model: @sale
        saleArtwork: @saleArtwork
        submitImmediately: false
    else
      new RegistrationForm
        el: $('#auction-registration-page')
        model: @sale
        success: =>
          new BidForm
            el: $('#auction-registration-page')
            model: @sale
            saleArtwork: @saleArtwork
            submitImmediately: true


module.exports.init = ->
  new AuctionRouter
    sale: new Sale sd.SALE
    saleArtwork: new SaleArtwork sd.SALE_ARTWORK
    registered: sd.REGISTERED

  Backbone.history.start(pushState: true)
