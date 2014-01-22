Backbone = require 'backbone'

module.exports = class HeroUnit extends Backbone.Model

  cssClass: ->
    'home-page-hero-unit-' + @get('mobile_menu_color_class')