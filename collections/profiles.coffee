_               = require 'underscore'
Backbone        = require 'backbone'
Profile         = require '../models/profile.coffee'
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Profiles extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch

  model: Profile
