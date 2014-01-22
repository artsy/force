Backbone = require 'backbone'
{ ARTSY_URL } = require('sharify').data
HeroUnit = require '../models/hero_unit.coffee'

module.exports = class HeroUnits extends Backbone.Collection

  url: "#{ARTSY_URL}/api/v1/site_hero_units?enabled=true"

  model: HeroUnit