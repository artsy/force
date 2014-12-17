_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Partner = require '../models/partner.coffee'
{ API_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'
Parallel = require '../models/mixins/parallel.coffee'

module.exports = class Partners extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(API_URL)
  _.extend @prototype, Parallel

  model: Partner

  url: "#{sd.API_URL}/api/v1/partners"
