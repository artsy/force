Q = require 'bluebird-q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
FeaturedLink = require '../models/featured_link'
OrderedSet = require '../models/ordered_set'

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
        dfd.resolve arguments...
    dfd.promise

class OrderedSetMeta extends Backbone.Model
  defaults: public: true

module.exports = class _OrderedSets
  constructor: (options) ->
    return new OrderedSets(null, meta: new OrderedSetMeta(options))
