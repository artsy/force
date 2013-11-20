Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class Artist extends Backbone.Model
  
  urlRoot: -> "#{sd.GRAVITY_URL}/api/v1/artist"