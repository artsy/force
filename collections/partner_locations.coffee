_               = require 'underscore'
Backbone        = require 'backbone'
PartnerLocation = require '../models/partner_location.coffee'
{ API_URL }   = require('sharify').data
{ Fetch }       = require 'artsy-backbone-mixins'

module.exports = class PartnerLocations extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: PartnerLocation
