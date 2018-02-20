_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class Section extends Backbone.Model

  urlRoot: "#{sd.POSITRON_URL}/api/sections"
