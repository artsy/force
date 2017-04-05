Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Sale = require '../models/sale'

module.exports = class Sales extends Backbone.Collection
  model: Sale

  url: "#{API_URL}/api/v1/sales"
