_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
Items = require '../collections/items.coffee'
LayoutSyle = require './mixins/layout_style.coffee'

module.exports = class OrderedSet extends Backbone.Model
  _.extend @prototype, LayoutSyle

  fetchItems: (cache = false, cacheTime) ->
    dfd = Q.defer()
    items = new Items null, id: @id, item_type: @get('item_type')
    @set items: items
    Q.allSettled(items.fetch(cache: cache, cacheTime: cacheTime).then ->
      items.map (item) ->
        if _.isFunction(item.fetchItems) then item.fetchItems(cache, cacheTime) else item
    ).finally dfd.resolve
    dfd.promise
