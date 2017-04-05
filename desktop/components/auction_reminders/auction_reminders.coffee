Backbone = require 'backbone'
Sale = require '../../models/sale'

module.exports = class AuctionReminders extends Backbone.Collection
  model: Sale
  # routed back to ./fetch.coffee
  url: '/auctions/reminders'
