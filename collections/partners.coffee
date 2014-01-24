_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
Partner         = require '../models/partner.coffee'
{ GRAVITY_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Partners extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(GRAVITY_URL)

  model: Partner

  url: "#{sd.ARTSY_URL}/api/v1/partners"
