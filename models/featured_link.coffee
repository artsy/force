_         = require 'underscore'
Backbone  = require 'backbone'
Items     = require '../collections/items.coffee'

{ Image, Markdown }   = require 'artsy-backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data

module.exports = class FeaturedLink extends Backbone.Model

  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  fetchItems: (cache=false) ->
    items = new Items null, { id: @id }
    items.fetch(cache: cache).then => @set { items: items }

  layoutStyle: (collectionLength) ->
    switch collectionLength
      when 1 then 'full'
      when 2 then 'half'
      when 3 then 'third'
      else 'quarter'

  imageSizeForLayout: (collectionLength) ->
    switch collectionLength
      when 1 then 'original'
      when 2, 3 then 'large_rectangle'
      else 'medium_rectangle'

  imageUrlForLayout: (collectionLength) ->
    @imageUrl @imageSizeForLayout collectionLength

  hasImageForLayout: (collectionLength) ->
    @hasImage @imageSizeForLayout collectionLength
