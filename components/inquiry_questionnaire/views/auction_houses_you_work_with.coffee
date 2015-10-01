Affiliated = require './affiliated.coffee'

module.exports = class AuctionHousesYouWorkWith extends Affiliated
  title: 'What auction houses do you work with?'
  collectorProfileAttribute: 'affiliated_auction_house_ids'
  galaxyPath: '_embedded.auction_houses'
  galaxyEndpoint: 'auction_houses'
