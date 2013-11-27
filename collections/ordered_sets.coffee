Q             = require 'q'
_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
FeaturedLink  = require '../models/featured_link.coffee'
OrderedSet    = require '../models/ordered_set.coffee'

class OrderedSets extends Backbone.Collection
  url: "#{sd.GRAVITY_URL}/api/v1/sets"

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

  fetchSets: ->
    @map (model) -> model.fetchItems()

class OrderedSetMeta extends Backbone.Model
  defaults:
    public: true

module.exports =
  new: (options) ->
    new OrderedSets(null, meta: new OrderedSetMeta(options))
