_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
SearchResult  = require '../../../models/search_result.coffee'

module.exports = class Search extends Backbone.Collection
  initialize: (options={}) ->
    { @mode, @restrictType, @fairId } = options

  _url: ->
    [
      "#{sd.ARTSY_URL}/api/v1/match/"
      (@mode || '')
      '?visible_to_public=true'
      (if @fairId then "&fair_id=#{@fairId}" else "")
    ].join('')

  parseResults: (items) ->
    if @restrictType?
      _.reject items, (item) =>
        item?.owner_type isnt @restrictType
    else
      items

  _parse: (items) ->
    _.map @parseResults(items), (item) =>
      item.model = @mode?.slice(0,-1) unless item.model?
      new SearchResult item
