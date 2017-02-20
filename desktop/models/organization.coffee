_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class Organization extends Backbone.Model

  urlRoot: "#{sd.POSITRON_URL}/api/organizations"
