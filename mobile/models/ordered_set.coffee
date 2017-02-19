_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
Items = require '../collections/items.coffee'

module.exports = class OrderedSet extends Backbone.Model

  fetchItems: (cache = false) ->
    dfd = Q.defer()
    items = new Items null, id: @id, item_type: @get('item_type')
    @set items: items
    Q.allSettled(items.fetch(cache: cache).then ->
      items.map (item) ->
        if _.isFunction(item.fetchItems) then item.fetchItems(cache) else item
    ).then dfd.resolve
    dfd.promise
