_         = require 'underscore'
Q         = require 'q'
Backbone  = require 'backbone'
Items     = require '../collections/items.coffee'
LayoutSyle = require './mixins/layout_style.coffee'

module.exports = class OrderedSet extends Backbone.Model
  _.extend @prototype, LayoutSyle

  fetchItems: (cache=false) ->
    deferred  = Q.defer()
    items     = new Items null, { id: @id, item_type: @get('item_type') }

    @set { items: items }

    Q.allSettled(items.fetch(cache: cache).then ->
      items.map (item) ->
        if _.isFunction(item.fetchItems) then item.fetchItems(cache) else item
    ).then -> deferred.resolve.apply this, arguments

    deferred.promise
