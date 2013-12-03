Q         = require 'q'
Backbone  = require 'backbone'
Items     = require '../collections/items.coffee'

module.exports = class OrderedSet extends Backbone.Model
  fetchItems: ->
    featuredLinks = new Items null, { id: @id }
    @set { items: featuredLinks }

    deferred = Q.defer()

    Q.allSettled(featuredLinks.fetch().then =>
      featuredLinks.map (featuredLink) -> featuredLink.fetchItems()
    ).then (promises) => deferred.resolve(promises)

    deferred.promise
