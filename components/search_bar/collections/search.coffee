_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
SearchResult = require '../../../models/search_result.coffee'

class Results extends Backbone.Collection
  model: SearchResult

module.exports = class Search
  constructor: (options = {}) ->
    { @mode, @restrictType, @fairId, @includePrivateResults } = options
    @results = new Results

  url: ->
    [
      "#{sd.API_URL}/api/v1/match/"
      @mode or ''
      '?visible_to_public=true'
      if @fairId then "&fair_id=#{@fairId}" else ''
      '&term=%QUERY'
    ].join ''

  parseResults: (items) ->
    if @restrictType?
      @restrictType = [@restrictType] unless _.isArray @restrictType
      _.filter items, (item) =>
        _.contains @restrictType, item?.owner_type
    else
      items

  parse: (items) ->
    @results.reset _.map @parseResults(items), (item) =>
      item.model = @mode?.slice(0,-1) unless item.model?
      item
