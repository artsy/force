_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Selected = require './selected.coffee'
deslugify = require '../../deslugify/index.coffee'

sectionMap =
  related_gene: 'Category'
  medium: 'Medium'
  gallery: 'Gallery'
  institution: 'Institution'
  period: 'Time Period'

module.exports = class FilterState extends Backbone.Model
  url: ->
    "#{API_URL}/api/v1/search/filtered/artist/#{@modelId}/suggest"

  initialize: (attributes, options = {}) ->
    { @modelId } = options
    throw new Error 'Requires an modelId' unless @modelId?

  criteria: ->
    _.reduce _.keys(@attributes), (criteria, x) =>
      if sectionMap[x] and not _.isEmpty(@get x)
        criteria[x] =
          label: sectionMap[x]
          filters: @sortFilters(x, _.map @get(x), (count, key) =>
            key: key, count: count, label: deslugify(key)
          )
      criteria
    , {}

  sortFilters: (key, filters) ->
    # Leave period filters in chronological order
    return filters if key is 'period'
    # Sort the rest by their count
    _.sortBy(filters, 'count').reverse()
