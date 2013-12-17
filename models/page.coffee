Backbone = require 'backbone'
sd = require('sharify').data
markdownMixin = require './mixins/markdown.coffee'
_ = require 'underscore'

module.exports = class Page extends Backbone.Model

  _.extend @prototype, markdownMixin

  urlRoot: "#{sd.ARTSY_URL}/api/v1/page"