_               = require 'underscore'
Backbone        = require 'backbone'
Profile         = require '../models/profile.coffee'
{ GRAVITY_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Profiles extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(GRAVITY_URL)

  model: Profile
