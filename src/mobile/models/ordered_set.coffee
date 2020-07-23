_ = require 'underscore'
Backbone = require 'backbone'
Items = require '../collections/items.coffee'

module.exports = class OrderedSet extends Backbone.Model

  fetchItems: (cache = false) ->
    items = new Items null, id: @id, item_type: @get('item_type')
    @set items: items
    fetchPromise = items.fetch(cache: cache).then ->
      items.map (item) ->
        if _.isFunction(item.fetchItems) then item.fetchItems(cache) else item
    Promise.allSettled([fetchPromise])
