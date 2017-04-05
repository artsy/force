_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
SearchResult = require '../models/search_result'

module.exports = class Search extends Backbone.Collection

  model: SearchResult

  url: "#{sd.API_URL}/api/v1/match?visible_to_public=true"

  updateLocationsForFair: (fair) ->
    @map (result) -> result.updateForFair fair
