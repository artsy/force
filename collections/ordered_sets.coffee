Q             = require 'q'
_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
FeaturedLink  = require '../models/featured_link.coffee'
OrderedSet    = require '../models/ordered_set.coffee'

class OrderedSets extends Backbone.Collection
  url: "#{sd.ARTSY_URL}/api/v1/sets"

  model: (attrs, options) ->
    switch attrs?.item_type
      when 'FeaturedLink' then new FeaturedLink attrs, options
      else
        new OrderedSet attrs, options

  initialize: (models, options) ->
    { @meta } = options
    super

  # Tacks on the meta attributes as query string parameters
  # before hitting the endpoint
  fetch: (options={}) ->
    qs = _.map(@meta.attributes, (value, key) -> "#{key}=#{value}").join '&'
    _.defaults options, { data: qs }
    Backbone.Collection::fetch.call this, options

  fetchItemsByOwner: (ownerType, ownerId, cache=false) ->
    @fetch(
      url: "#{sd.ARTSY_URL}/api/v1/sets?owner_type=#{ownerType}&owner_id=#{ownerId}&sort=key"
      cache: cache
    ).then( =>
      @fetchSets
        cache: cache
    )

  fetchSets: (options={}) ->
    deferred  = Q.defer()
    promises  = @map (model) -> model.fetchItems options?.cache
    Q.allSettled(promises).then -> deferred.resolve.apply this, arguments
    deferred.promise

  fetchAll: (options={}) ->
    @fetch(options).then => @fetchSets(options).then => @trigger 'sync:complete'

class OrderedSetMeta extends Backbone.Model
  defaults: { public: true }

module.exports = class _OrderedSets
  constructor: (options) ->
    return new OrderedSets(null, meta: new OrderedSetMeta(options))
