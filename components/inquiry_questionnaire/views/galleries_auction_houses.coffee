StepView = require './step.coffee'
template = -> require('../templates/galleries_auction_houses.jade') arguments...

module.exports = class GalleriesAuctionHouses extends StepView
  template: template

  __events__:
    'click button': 'next'
