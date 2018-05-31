_ = require 'underscore'
_s = require 'underscore.string'
qs = require 'querystring'
sd = require('sharify').data
Backbone = require 'backbone'
SearchResult = require '../../../models/search_result.coffee'

class Results extends Backbone.Collection
  model: SearchResult

module.exports = class Search
  urlRoot: "#{sd.API_URL}/api/v1/match"

  defaults:
    size: 4
    agg: false

  categories: ['artist', 'sale', 'gallery', 'institution', 'fair']

  constructor: (options = {}) ->
    { @mode, @restrictType, @fairId, @includePrivateResults, @size, @agg } =
      _.defaults options, @defaults
    @results = new Results

  url: ->
    @urlRoot +
    (if @mode then "/#{@mode}" else '') +
    "?#{@data()}"

  data: ->
    data = visible_to_public: true, fair_id: @fairId, size: @size, agg: @agg
    "#{qs.stringify data}&term=%QUERY" # Requires an unencoded percent character

  filterResults: (items) ->
    _.reject items, (item) ->
      JSON.stringify(item).match(/kippenberger|zoe.*leonard/i)

  pluralizeAndCapitalize: (word) ->
    if word.slice(-1) is 'y'
      "#{_s.capitalize(word.slice(0, -1))}ies"
    else
      "#{_s.capitalize(word)}s"

  flattenGrouping: (category, items) ->
    results = []

    if items?.length > 0
      firstItem = items.shift()
      firstItem.displayHeading = true
      firstItem.category = @pluralizeAndCapitalize(category)
      results.push(firstItem)
      results = results.concat(items)

    results

  parseResults: (items, aggregations) ->
    if aggregations
      results = []
      @categories.forEach((category) =>
        results = results.concat(@flattenGrouping(category, items[category]))
        delete items[category]
      )
      Object.keys(items).forEach((category) =>
        results = results.concat(@flattenGrouping(category, items[category]))
      )
      results
    else
      if @restrictType?
        @restrictType = [@restrictType] unless _.isArray @restrictType
        _.filter items, (item) =>
          _.contains @restrictType, item?.owner_type
      else
        items

  parse: (items, options = {}) ->
    @results.reset _.map @filterResults(@parseResults(items, options.aggregations)), (item) =>
      item.model = @mode?.slice(0,-1) unless item.model?
      item
