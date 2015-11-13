sd = require('sharify').data
Backbone = require 'backbone'
Relations = require './mixins/relations/partner_category.coffee'
_ = require 'underscore'

module.exports = class PartnerCategory extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{sd.API_URL}/api/v1/partner_category"
