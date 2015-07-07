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
    related_gene: 'gene_id'
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
    _.reduce _.keys(@attributes), (criteria, x) =>
      if sectionMap[x] and not _.isEmpty(@get x)
        criteria[x] =
          label: sectionMap[x]
          filters: @sortFilters(x, _.map @get(x), ({ count, name }, key) =>
            key: key, count: count, label: name
          )
      criteria
    , {}

  sortFilters: (key, filters) ->
    # Leave period filters in chronological order
    return filters if key is 'period'
    # Sort the rest by their count
    _.sortBy(filters, 'count').reverse()
