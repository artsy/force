_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Profile = require '../models/profile.coffee'
{ AToZ, Fetch } = require 'artsy-backbone-mixins'

module.exports = class Profiles extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(sd.API_URL)

  model: Profile

  url: -> "#{sd.API_URL}/api/v1/profiles"
