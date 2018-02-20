_ = require 'underscore'
qs = require 'querystring'
sd = require('sharify').data
Backbone = require 'backbone'
SearchResult = require '../../../models/search_result.coffee'

class Results extends Backbone.Collection
  model: SearchResult

module.exports = class Search
  urlRoot: "#{sd.API_URL}/api/v1/match"

  defaults: size: 4

  constructor: (options = {}) ->
    { @mode, @restrictType, @fairId, @includePrivateResults, @size } =
      _.defaults options, @defaults
    @results = new Results

  url: ->
    @urlRoot +
    (if @mode then "/#{@mode}" else '') +
    "?#{@data()}"

  data: ->
    data = visible_to_public: true, fair_id: @fairId, size: @size
    "#{qs.stringify data}&term=%QUERY" # Requires an unencoded percent character

  parseResults: (items) ->
    if @restrictType?
      @restrictType = [@restrictType] unless _.isArray @restrictType
      _.filter items, (item) =>
        _.contains @restrictType, item?.owner_type
    else
      items

  parse: (items, query) ->
    # HACK filter out sensitive results
    items = _.reject items, (item) ->
      JSON.stringify(item).match(/kippenberger|zoe.*leonard/i)
    @results.reset _.map @parseResults(items), (item) =>
      item.model = @mode?.slice(0,-1) unless item.model?
      item
