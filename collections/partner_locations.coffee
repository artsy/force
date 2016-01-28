_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
PartnerLocation = require '../models/partner_location.coffee'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class PartnerLocations extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: PartnerLocation

  displayLocations: (preferredLocation) ->
    if @length
      string =
        @findWhere(city: preferredLocation)?.get('city') or
        @first().get('city') or
        @first().get('country')

      if @length > 1
        string += " & #{@length - 1} other location"
        string += "s" unless @length is 2

      string

  displayCities: (separator = ', ', unique = true) ->
    cities = @map (loc) -> _s.titleize(loc.get('city'))
    cities = _.uniq cities if unique
    cities.join separator
