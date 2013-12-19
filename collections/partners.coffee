_        = require 'underscore'
sd       = require('sharify').data
Backbone = require 'backbone'
Partner  = require '../models/partner.coffee'

module.exports = class Partners extends Backbone.Collection

  model: Partner

  url: "#{sd.ARTSY_URL}/api/v1/partners"
