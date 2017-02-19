{ AUCTION, ARTWORKS } = require('sharify').data
bootstrap = require '../../../components/layout/bootstrap.coffee'
Auction = require '../../../models/sale.coffee'
Artworks = require '../../../collections/artworks.coffee'
AuctionClockView = require '../../../components/auction_clock/view.coffee'
AvantGardeTabsView = require '../../../components/avant_garde_tabs/view.coffee'
AuctionArtworkListView = require '../../../components/auction_artwork_list/view.coffee'

module.exports.init = ->
  bootstrap()

  auction = new Auction AUCTION
  artworks = new Artworks ARTWORKS

  new AuctionClockView(model: auction, el: $('.js-auction-clock'))
    .start()

  new AvantGardeTabsView el: $('.js-auction-tabs')

  new AuctionArtworkListView el: $('.js-auction-artwork-list'), model: auction, collection: artworks
