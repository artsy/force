_ = require 'underscore'
_s = require 'underscore.string'
qs = require 'querystring'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Selected = require './selected.coffee'

sectionMap =
  related_gene: 'Category'
  medium: 'Medium'
  gallery: 'Gallery'
  institution: 'Institution'
  period: 'Time Period'

module.exports = class FilterState extends Backbone.Model
  url: ->
    "#{API_URL}/api/v1/search/filtered/artist/#{@modelId}/suggest"

  booleans:
    'for-sale': price_range: '-1:1000000000000'

  initialize: (attributes, options = {}) ->
    { @modelId } = options
    throw new Error 'Requires an modelId' unless @modelId?

  boolean: (name) ->
    [key, value] = _.flatten(_.pairs(@booleans[name]))
    @get(key)?[value]

  criteria: ->
    _.reduce _.keys(@attributes), (criteria, x) =>
      if sectionMap[x] and not _.isEmpty(@get x)
        criteria[x] =
          label: sectionMap[x]
          filters: @sortFilters(x, _.map @get(x), (count, key) =>
            key: key, count: count, label: @humanize(key)
          )
      criteria
    , {}

  sortFilters: (key, filters) ->
    # Leave period filters in chronological order
    return filters if key is 'period'
    # Sort the rest by their count
    _.sortBy(filters, 'count').reverse()

  humanize: (string) ->
    _s.titleize _s.humanize string
