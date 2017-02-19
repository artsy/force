Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class Feedback extends Backbone.Model
  url: "#{API_URL}/api/v1/feedback"
