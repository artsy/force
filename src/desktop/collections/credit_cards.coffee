Backbone = require 'backbone'
{ API_URL } = require('sharify').data
CreditCard = require '../models/credit_card.coffee'

module.exports = class CreditCards extends Backbone.Collection
  model: CreditCard

  url: "#{API_URL}/api/v1/me/credit_cards"
