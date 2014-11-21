_ = require 'underscore'
Backbone = require 'backbone'
GoogleSearchResult = require '../models/google_search_result.coffee'
{ GOOGLE_SEARCH_KEY, GOOGLE_SEARCH_CX } = require "../../../config"

module.exports = class GoogleSearchResults extends Backbone.Collection
  model: GoogleSearchResult

  url: "https://www.googleapis.com/customsearch/v1?key=#{GOOGLE_SEARCH_KEY}&cx=#{GOOGLE_SEARCH_CX}"

  parse:  (response) ->
    _.reject response.items, (item) ->
      # Filter out auction results
      item.link?.indexOf('/auction-result') isnt -1 or
      # Filter out 403s
      item.title is '403 Forbidden'

  moveMatchResultsToTop: (query) ->
    models = @models
    for item, index in @models
      if item.get('display_model') isnt 'show' and item.get('display').toLowerCase() is query.toLowerCase()
        models.splice(0, 0, models.splice(index, 1)[0])
    models
