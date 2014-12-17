_ = require 'underscore'
Backbone = require 'backbone'
PartnerArtist = require '../models/partner_artist.coffee'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'
Parallel = require '../models/mixins/parallel.coffee'

module.exports = class PartnerArtists extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)
  _.extend @prototype, Parallel

  model: PartnerArtist

  comparator: 'sortable_id'
