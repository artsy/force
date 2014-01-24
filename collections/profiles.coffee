_             = require 'underscore'
Backbone      = require 'backbone'
Profile       = require '../models/profile.coffee'
aToZ          = require './mixins/a_to_z.coffee'
{ Fetch }     = require 'artsy-backbone-mixins'

module.exports = class Profiles extends Backbone.Collection

  _.extend @prototype, aToZ
  _.extend @prototype, Fetch

  model: Profile
