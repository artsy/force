Q         = require 'q'
Backbone  = require 'backbone'
Items     = require '../collections/items.coffee'

module.exports = class OrderedSet extends Backbone.Model

  fetchItems: (cache=false) ->
    featuredLinks = new Items null, { id: @id }
    @set { items: featuredLinks }

    deferred = Q.defer()

    Q.allSettled(featuredLinks.fetch(cache: cache).then =>
      featuredLinks.map (featuredLink) -> featuredLink.fetchItems(cache: cache)
    ).then (promises) => deferred.resolve(promises)

    deferred.promise
