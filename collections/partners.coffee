_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
Partner       = require '../models/partner.coffee'
aToZ          = require './mixins/a_to_z.coffee'
fetchUntilEnd = require './mixins/fetch_until_end.coffee'

module.exports = class Partners extends Backbone.Collection

  _.extend @prototype, aToZ
  _.extend @prototype, fetchUntilEnd

  model: Partner

  url: "#{sd.ARTSY_URL}/api/v1/partners"
