_             = require 'underscore'
Backbone      = require 'backbone'
sd            = require('sharify').data

module.exports = class Shortcut extends Backbone.Model

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/shortcut"
