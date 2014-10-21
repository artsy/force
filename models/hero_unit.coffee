_ = require 'underscore'
Backbone = require 'backbone'
{ SECURE_IMAGES_URL } = require('sharify').data
{ Markdown, Image } = require 'artsy-backbone-mixins'

module.exports = class HeroUnit extends Backbone.Model
  _.extend @prototype, Markdown
  _.extend @prototype, Image(SECURE_IMAGES_URL)

  cssClass: ->
    [
      "home-hero-unit-#{@get('menu_color_class')}"
      "home-hero-unit-#{@get('type')}"
    ].join ' '

  guardedImageUrl: (attr) ->
    @sslUrl(@get attr) if @has(attr)

  backgroundImageUrl: ->
    @guardedImageUrl 'background_image_url'

  titleImageUrl: ->
    @guardedImageUrl 'title_image_url'

  titleImageRetinaUrl: ->
    @guardedImageUrl 'title_image_retina_url'
