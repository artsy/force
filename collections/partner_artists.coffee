_             = require 'underscore'
Backbone      = require 'backbone'
PartnerArtist = require '../models/partner_artist.coffee'
{ ARTSY_URL } = require('sharify').data
{ Fetch }     = require 'artsy-backbone-mixins'

module.exports = class PartnerArtists extends Backbone.Collection

  _.extend @prototype, Fetch(ARTSY_URL)

  model: PartnerArtist
