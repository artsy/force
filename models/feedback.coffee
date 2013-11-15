Backbone  = require 'backbone'
sd        = require('sharify').data

module.exports = class Feedback extends Backbone.Model
  url: "#{sd.GRAVITY_URL}/api/v1/feedback"
