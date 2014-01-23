_ = require 'underscore'
Backbone = require 'backbone'
markdownMixin = require './mixins/markdown.coffee'

module.exports = class HeroUnit extends Backbone.Model

  _.extend @prototype, markdownMixin

  cssClass: ->
    [
      'home-hero-unit-' + @get('menu_color_class')
      'home-hero-unit-' + @get('type')
    ].join ' '