Backbone = require 'backbone'
sd = require('sharify').data
markdownMixin = require './mixins/markdown.coffee'
_ = require 'underscore'

module.exports = class Artist extends Backbone.Model
  
  _.extend @prototype, markdownMixin
  
  urlRoot: "#{sd.GRAVITY_URL}/api/v1/artist"