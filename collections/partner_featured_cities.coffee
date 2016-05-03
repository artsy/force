Backbone = require 'backbone'
{ GEODATA_URL } = require '../config.coffee'

module.exports = class PartnerFeaturedCities extends Backbone.Collection
  url: "#{GEODATA_URL}/partner-cities/featured-cities.json"
