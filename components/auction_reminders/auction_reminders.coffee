Backbone = require 'backbone'
Sale = require '../../models/sale.coffee'

module.exports = class AuctionReminders extends Backbone.Collection
  model: Sale
  url: '/auctions/reminders'
