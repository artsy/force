Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class ArtworkInquiry extends Backbone.Model
  url: "#{API_URL}/api/v1/me/artwork_inquiry_request"
