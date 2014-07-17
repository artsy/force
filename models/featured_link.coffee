_ = require 'underscore'
Backbone = require 'backbone'
Items = require '../collections/items.coffee'
LayoutSyle = require './mixins/layout_style.coffee'
{ Image, Markdown } = require 'artsy-backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data

module.exports = class FeaturedLink extends Backbone.Model
  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, Markdown
  _.extend @prototype, LayoutSyle

  initialize: ->
    # Add the original to the image versions array
    if _.isArray(@get('image_versions')) and not @hasImage('original')
      @get('image_versions').push 'original'

  imageUrlForLayout: (collectionLength) ->
    @imageUrl @imageSizeForLayout collectionLength

  hasImageForLayout: (collectionLength) ->
    @hasImage @imageSizeForLayout collectionLength
