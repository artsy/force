Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class Bookmark extends Backbone.Model
  urlRoot: "#{API_URL}/api/v1/me/bookmark/artist"

  defaults:
    bookmark_type: 'collecting'
