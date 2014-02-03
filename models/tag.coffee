_ = require 'underscore'
{ ARTSY_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports = class Tag extends Backbone.Model

  urlRoot: "#{ARTSY_URL}/api/v1/tag"