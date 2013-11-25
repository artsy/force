Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class Gene extends Backbone.Model
  
  urlRoot: "#{sd.GRAVITY_URL}/api/v1/gene"