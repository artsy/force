_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class Shortcut extends Backbone.Model

  urlRoot: -> "#{sd.API_URL}/api/v1/shortcut"
