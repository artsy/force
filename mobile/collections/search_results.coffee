_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class SearchResults extends Backbone.Collection

  url: -> sd.API_URL + '/api/v1/match'

  initialize: ->
    @model = require '../models/search_result.coffee'

  updateLocationsForFair: (fair) ->
    @map (result) -> result.updateForFair fair
