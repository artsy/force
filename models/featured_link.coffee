_         = require 'underscore'
Q         = require 'q'
Backbone  = require 'backbone'
Items     = require '../collections/items.coffee'
{ Image } = require 'artsy-backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data

module.exports = class FeaturedLink extends Backbone.Model
   _.extend @prototype, Image(SECURE_IMAGES_URL)

  fetchItems: (cache=false) ->
    items = new Items null, { id: @id }
    items.fetch(cache: cache).then => @set { items: items }
