_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
FeaturedLink = require '../models/featured_link.coffee'
OrderedSet = require '../models/ordered_set.coffee'

class OrderedSets extends Backbone.Collection
  url: "#{sd.API_URL}/api/v1/sets"

  model: OrderedSet

  initialize: (models, { @meta }) -> #

  fetch: (options = {}) ->
    _.defaults options, data: @meta.attributes
    Backbone.Collection::fetch.call this, options

  # This could simply be replaced with:
  # new OrderedSets(owner_type: 'your_owner_type', owner_id: 'your_owner_id', sort: 'key')
  fetchItemsByOwner: (ownerType, ownerId, options = {}) ->
    options = _.defaults options,
      cache: true
      data: display_on_desktop: true

    new Promise((resolve) =>
      cache = options.cache
      cacheTime = options.cacheTime

      @fetch
        url: "#{sd.API_URL}/api/v1/sets?owner_type=#{ownerType}&owner_id=#{ownerId}&sort=key"
        cache: cache
        cacheTime: cacheTime
        data: options.data
        error: resolve
        success: =>
          @fetchSets(cache: cache, cacheTime: cacheTime).then resolve
    )

  fetchSets: (options = {}) ->
    Promise.allSettled(@map (model) ->
      model.fetchItems options.cache, options.cacheTime
    )

  fetchAll: (options = {}) ->
    new Promise((resolve) =>
      @fetch(options).then =>
        @fetchSets(options).then =>
          @trigger 'sync:complete'
          resolve arguments...
    )

class OrderedSetMeta extends Backbone.Model
  defaults: public: true

module.exports = class _OrderedSets
  constructor: (options) ->
    return new OrderedSets(null, meta: new OrderedSetMeta(options))
