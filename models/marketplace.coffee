Backbone    = require 'backbone'

module.exports = class Marketplace extends Backbone.Model

  url: -> "/api/v1/marketplace"
