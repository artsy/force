Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class Introduction extends Backbone.Model
  url: "#{API_URL}/api/v1/me/inquiry_introduction"
