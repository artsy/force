_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class Vertical extends Backbone.Model

  urlRoot: "#{sd.POSITRON_URL}/api/verticals"
