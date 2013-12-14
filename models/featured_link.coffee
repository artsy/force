Q         = require 'q'
Backbone  = require 'backbone'
Items     = require '../collections/items.coffee'

module.exports = class FeaturedLink extends Backbone.Model

  fetchItems: (cache) ->
    items = new Items null, { id: @id }
    items.fetch(cache: cache).then => @set { items: items }
