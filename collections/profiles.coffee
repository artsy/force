_               = require 'underscore'
Backbone        = require 'backbone'
Profile         = require '../models/profile.coffee'
{ ARTSY_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Profiles extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(ARTSY_URL)

  model: Profile
