_ = require 'underscore'
Backbone = require 'backbone'
{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class HeroUnit extends Backbone.Model

  _.extend @prototype, Markdown

  cssClass: ->
    [
      'home-hero-unit-' + @get('menu_color_class')
      'home-hero-unit-' + @get('type')
    ].join ' '