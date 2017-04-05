{ AUCTION, ARTWORKS } = require('sharify').data
bootstrap = require '../../../components/layout/bootstrap'
Auction = require '../../../models/sale'
Artworks = require '../../../collections/artworks'
AuctionClockView = require '../../../components/auction_clock/view'
AvantGardeTabsView = require '../../../components/avant_garde_tabs/view'
AuctionArtworkListView = require '../../../components/auction_artwork_list/view'

module.exports.init = ->
  bootstrap()

  auction = new Auction AUCTION
  artworks = new Artworks ARTWORKS

  new AuctionClockView(model: auction, el: $('.js-auction-clock'))
    .start()

  new AvantGardeTabsView el: $('.js-auction-tabs')

  new AuctionArtworkListView el: $('.js-auction-artwork-list'), model: auction, collection: artworks
