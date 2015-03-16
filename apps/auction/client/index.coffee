{ AUCTION, ARTWORKS } = require('sharify').data
Auction = require '../../../models/sale.coffee'
Artworks = require '../../../collections/artworks.coffee'
SaleArtworks = require '../../../collections/sale_artworks.coffee'
ClockView = require '../../../components/clock/view.coffee'
SpecialistView = require '../../../components/contact/general_specialist.coffee'
AuctionArtworksView = require './view.coffee'

module.exports.init = ->
  auction = new Auction AUCTION
  artworks = new Artworks ARTWORKS

  new AuctionArtworksView el: $('.js-auction-artworks-section'), model: auction, collection: artworks

  # Re-fetch due to cache
  saleArtworks = new SaleArtworks [], id: auction.id
  saleArtworks.fetchUntilEndInParallel success: ->
    artworks.reset Artworks.__fromSale__ saleArtworks

  clock = new ClockView el: $('.js-auction-clock'), model: auction, modelName: 'Auction'
  clock.start()

  $('.js-specialist-contact-link').click (e) ->
    e.preventDefault()
    new SpecialistView
