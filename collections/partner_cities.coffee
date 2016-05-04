Backbone = require 'backbone'
{ GEODATA_URL } = sd = require('sharify').data

module.exports = class PartnerCities extends Backbone.Collection
  url: "#{GEODATA_URL}/partner-cities/cities.json"
