Backbone = require 'backbone'
{ GEODATA_URL } = sd = require('sharify').data

module.exports = class GeocodedCities extends Backbone.Collection
  url: "#{GEODATA_URL}/partner-cities/geocoded_cities.json"
