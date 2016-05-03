Backbone = require 'backbone'
{ GEODATA_URL } = require '../config.coffee'

module.exports = class PartnerCities extends Backbone.Collection
  url: "#{GEODATA_URL}/partner-cities/cities.json"
