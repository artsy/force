Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Representative = require '../models/representative'

module.exports = class Representatives extends Backbone.Collection
  model: Representative

  url: "#{API_URL}/api/v1/admins/available_representatives"
