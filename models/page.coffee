_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class Page extends Backbone.Model
  _.extend @prototype, Markdown

  urlRoot: "#{sd.API_URL}/api/v1/page"
