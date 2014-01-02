_             = require 'underscore'
Backbone      = require 'backbone'
Profile       = require '../models/profile.coffee'
aToZ          = require './mixins/a_to_z.coffee'
fetchUntilEnd = require './mixins/fetch_until_end.coffee'

module.exports = class Profiles extends Backbone.Collection

  _.extend @prototype, aToZ
  _.extend @prototype, fetchUntilEnd

  model: Profile
