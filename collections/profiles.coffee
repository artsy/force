_ = require 'underscore'
Backbone = require 'backbone'
Profile = require '../models/profile.coffee'
{ API_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Profiles extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(API_URL)

  model: Profile
