_         = require 'underscore'
Q         = require 'q'
Backbone  = require 'backbone'
Items     = require '../collections/items.coffee'
Image     = require './mixins/image.coffee'

module.exports = class FeaturedLink extends Backbone.Model
  _.extend @prototype, Image

  fetchItems: (cache=false) ->
    items = new Items null, { id: @id }
    items.fetch(cache: cache).then => @set { items: items }
