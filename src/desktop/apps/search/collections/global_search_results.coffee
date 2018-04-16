_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
qs = require 'querystring'
SearchResult = require '../../../models/search_result.coffee'

module.exports = class GlobalSearchResults extends Backbone.Collection
  model: SearchResult

  url: "#{sd.API_URL}/api/v1/match"

  parse:  (response) ->
    _.reject response, (item) ->
      # HACK filter out sensitive results (at the artist's request)
      JSON.stringify(item).match(/kippenberger|zoe.*leonard/i)