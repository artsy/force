Backbone = require 'backbone'
{ GEODATA_URL } = sd = require('sharify').data

module.exports = class PartnerFeaturedCities extends Backbone.Collection
  url: "#{GEODATA_URL}/partner-cities/featured-cities.json"
