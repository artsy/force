_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class Section extends Backbone.Model

  _.extend @prototype, Markdown

  urlRoot: "#{sd.POSITRON_URL}/api/sections"
