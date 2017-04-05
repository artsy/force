_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
PartnerLocation = require '../models/partner_location'

module.exports = class PartnerLocations extends Backbone.Collection
  model: PartnerLocation

  url: ->
    "#{sd.API_URL}/api/v1/partner/#{@partnerId}/locations"

  initialize: (models, { @partnerId } = {}) -> #

  getLocationAddressNearest: (city) ->
    return unless @length

    if city is 'All Galleries'
      @first()?.get('city')
    else
      @findWhere(city: city)?.get('address') or
      @first()?.get('address')
