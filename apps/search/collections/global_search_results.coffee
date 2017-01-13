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

  moveMatchResultsToTop: (query) ->
    models = @models
    for item, index in @models
      if item.get('display_model') isnt 'show' and item.get('display').toLowerCase() is query.toLowerCase()
        models.splice(0, 0, models.splice(index, 1)[0])
    models
