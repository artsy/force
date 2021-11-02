_ = require 'underscore'
Backbone = require 'backbone'
Items = require '../collections/items'
LayoutSyle = require './mixins/layout_style.coffee'

module.exports = class OrderedSet extends Backbone.Model
  _.extend @prototype, LayoutSyle

  fetchItems: (cache = false, cacheTime) ->
    items = new Items null, id: @id, item_type: @get('item_type')
    @set items: items
    fetchPromise = items.fetch(cache: cache, cacheTime: cacheTime).then ->
      items.map (item) ->
        if _.isFunction(item.fetchItems) then item.fetchItems(cache, cacheTime) else item
    Promise.allSettled([fetchPromise])
