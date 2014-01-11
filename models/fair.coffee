sd        = require('sharify').data
Backbone  = require 'backbone'

module.exports = class Fair extends Backbone.Model

  href: ->
    "/#{@get('id')}"
