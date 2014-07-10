_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
SearchResult  = require '../../../models/search_result.coffee'

module.exports = class Search extends Backbone.Collection
  initialize: (options={}) ->
    { @mode, @restrictType, @fairId, @includePrivateResults } = options

  _url: ->
    [
      "#{sd.API_URL}/api/v1/match/"
      (@mode or '')
      '?visible_to_public=true'
      (if @fairId then "&fair_id=#{@fairId}" else "")
    ].join('')

  parseResults: (items) ->
    if @restrictType?
      @restrictType = [@restrictType] unless _.isArray @restrictType
      _.reject items, (item) =>
        not _.contains @restrictType, item?.owner_type
    else
      items

  _parse: (items) ->
    _.map @parseResults(items), (item) =>
      item.model = @mode?.slice(0,-1) unless item.model?
      new SearchResult item
