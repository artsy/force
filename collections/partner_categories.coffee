_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'
PartnerCategory = require '../models/partner_category.coffee'

module.exports = class PartnerCategories extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  url: "#{sd.API_URL}/api/v1/partner_categories"
  model: PartnerCategory