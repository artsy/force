_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
GoogleSearchResult = require '../models/google_search_result.coffee'

{ GOOGLE_SEARCH_KEY, GOOGLE_SEARCH_CX } = require "../../../config"

module.exports = class GoogleSearchResults extends Backbone.Collection

  model: GoogleSearchResult

  url: "https://www.googleapis.com/customsearch/v1?key=#{GOOGLE_SEARCH_KEY}&cx=#{GOOGLE_SEARCH_CX}"

  parse:  (response) ->
    # Filter out auction results
    items = _.filter(response.items, (item) ->
      item.link?.indexOf('/auction-result') < 0
    )
    items

  moveMatchResultsToTop: (query) ->
    models = @models
    for item, index in @models
      if item.get('display_model') != 'show' && item.get('display').toLowerCase() == query.toLowerCase()
        models.splice(0, 0, models.splice(index, 1)[0] );
    models
