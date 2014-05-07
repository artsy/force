Q             = require 'q'
_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
FeaturedLink  = require '../models/featured_link.coffee'
OrderedSet    = require '../models/ordered_set.coffee'

class OrderedSets extends Backbone.Collection
  url: "#{sd.API_URL}/api/v1/sets"
  model: OrderedSet

  initialize: (models, options) ->
    { @meta } = options
    super

  # Tacks on the meta attributes as query string parameters
  # before hitting the endpoint
  fetch: (options={}) ->
    qs = _.map(@meta.attributes, (value, key) -> "#{key}=#{value}").join '&'
    _.defaults options, { data: qs }
    Backbone.Collection::fetch.call this, options

  # This could simply be replaced with:
  # new OrderedSets(owner_type: 'your_owner_type', owner_id: 'your_owner_id', sort: 'key')
  fetchItemsByOwner: (ownerType, ownerId, cache=false) ->
    dfd  = Q.defer()
    promises  = [
      @fetch
        url: "#{sd.API_URL}/api/v1/sets?owner_type=#{ownerType}&owner_id=#{ownerId}&sort=key"
        cache: cache
        data:
          display_on_desktop: true
        success: =>
          @fetchSets(
            cache: cache
          ).then dfd.resolve
    ]
    dfd.promise

  fetchSets: (options = {}) ->
    dfd = Q.defer()
    Q.allSettled(@map (model) ->
      model.fetchItems options?.cache
    ).then dfd.resolve
    dfd.promise

  fetchAll: (options = {}) ->
    dfd = Q.defer()
    @fetch(options).then =>
      @fetchSets(options).then =>
        @trigger 'sync:complete'
        dfd.resolve()
    dfd.promise

class OrderedSetMeta extends Backbone.Model
  defaults: public: true

module.exports = class _OrderedSets
  constructor: (options) ->
    return new OrderedSets(null, meta: new OrderedSetMeta(options))
