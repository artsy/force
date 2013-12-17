Backbone  = require 'backbone'
sd        = require('sharify').data

module.exports = class Feedback extends Backbone.Model
  url: "#{sd.ARTSY_URL}/api/v1/feedback"
