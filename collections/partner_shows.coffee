Backbone = require 'backbone'
_ = require 'underscore'
PartnerShow = require '../models/partner_show.coffee'
{ ARTSY_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class PartnerShows extends Backbone.Collection

  _.extend @prototype, Fetch(ARTSY_URL)

  model: PartnerShow