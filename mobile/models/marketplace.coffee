Backbone = require 'backbone'
{ API_URL, CURRENT_USER } = require('sharify').data

module.exports = class Marketplace extends Backbone.Model

  url: -> "#{API_URL}/api/v1/marketplace"
