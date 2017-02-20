Backbone = require 'backbone'
sd = require('sharify').data
{ Markdown } = require 'artsy-backbone-mixins'
_ = require 'underscore'

module.exports = class Page extends Backbone.Model

  _.extend @prototype, Markdown

  urlRoot: "#{sd.API_URL}/api/v1/page"
