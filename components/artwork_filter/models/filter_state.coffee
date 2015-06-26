_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Selected = require './selected.coffee'
deslugify = require '../../deslugify/index.coffee'
sectionMap = require '../sections.coffee'

module.exports = class FilterState extends Backbone.Model
  url: ->
    "#{API_URL}/api/v1/search/filtered/artist/#{@artistId}/suggest"

  initialize: (attributes, { @artistId }) ->
    throw new Error 'Requires an artistId' unless @artistId?

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
