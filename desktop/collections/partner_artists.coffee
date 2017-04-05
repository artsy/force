_ = require 'underscore'
Backbone = require 'backbone'
PartnerArtist = require '../models/partner_artist'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class PartnerArtists extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: PartnerArtist

  comparator: 'sortable_id'
