_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Selected = require './selected.coffee'
deslugify = require '../../deslugify/index.coffee'
aggregations = require '../aggregations.coffee'
sectionMap = require '../sections.coffee'

module.exports = class FilterState extends Backbone.Model
  mapppedParams:
    gallery: 'partner_id'
    institution: 'partner_id'

  url: -> "#{API_URL}/api/v1/filter/artworks"

  initialize: (attributes, { @artistId }) ->
    throw new Error 'Requires an artistId' unless @artistId?

  sync: (method, model, options) =>
    data = _.clone options.data

    _.extend data,
      size: 0
      aggregations: aggregations
      artist_id: @artistId

    for k, v of @mapppedParams
      if val = data[k]
        data[v] = val
        delete data[k]

    options.data = data

    super

  parse: (data) -> data.aggregations

  criteria: ->
    keys = _.reject _.keys(sectionMap), (key) =>
      _.isEmpty(@get key)

    _.reduce keys, (criteria, key) =>
      criteria[key] =
        label: sectionMap[key]
        filters: @sortFilters(key, _.map @get(key), ({ count, name }, innerKey) =>
          key: innerKey, count: count, label: name
        )
      criteria
    , {}

  sortFilters: (key, filters) ->
    # Leave period filters in chronological order
    return filters if key is 'period'
    # Sort the rest by their count
    _.sortBy(filters, 'count').reverse()
