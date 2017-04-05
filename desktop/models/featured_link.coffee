_ = require 'underscore'
Backbone = require 'backbone'
Items = require '../collections/items'
LayoutSyle = require './mixins/layout_style'
{ Image, Markdown } = require 'artsy-backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data
ImageSizes = require './mixins/image_sizes'

module.exports = class FeaturedLink extends Backbone.Model
  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, ImageSizes
  _.extend @prototype, Markdown
  _.extend @prototype, LayoutSyle

  imageUrlForLayout: (collectionLength) ->
    @imageUrl @imageSizeForLayout collectionLength

  hasImageForLayout: (collectionLength) ->
    @hasImage @imageSizeForLayout collectionLength

  imageUrlForMaxSize: ->
    @get('image_urls')?.large_rectangle
