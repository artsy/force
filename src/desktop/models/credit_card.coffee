Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class CreditCard extends Backbone.Model
  urlRoot: ->
    if @id?
      "#{API_URL}/api/v1/me/credit_card"
    else
      "#{API_URL}/api/v1/me/credit_cards"
