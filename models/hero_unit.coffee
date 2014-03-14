_ = require 'underscore'
Backbone = require 'backbone'
{ SECURE_IMAGES_URL } = require('sharify').data
{ Markdown, Image } = require 'artsy-backbone-mixins'

module.exports = class HeroUnit extends Backbone.Model

  _.extend @prototype, Markdown
  _.extend @prototype, Image(SECURE_IMAGES_URL)

  cssClass: ->
    [
      'home-hero-unit-' + @get('menu_color_class')
      'home-hero-unit-' + @get('type')
    ].join ' '

  backgroundImageUrl: ->
    @sslUrl @get('background_image_url')

  titleImageUrl: ->
    @sslUrl @get('title_image_url')
