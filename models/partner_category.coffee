sd = require('sharify').data
Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class PartnerCategory extends Backbone.Model

  urlRoot: "#{sd.API_URL}/api/v1/partner_category"
