_               = require 'underscore'
Backbone        = require 'backbone'
PartnerLocation = require '../models/partner_location.coffee'
{ ARTSY_URL }   = require('sharify').data
{ Fetch }       = require 'artsy-backbone-mixins'

module.exports = class PartnerLocations extends Backbone.Collection

  _.extend @prototype, Fetch(ARTSY_URL)

  model: PartnerLocation
