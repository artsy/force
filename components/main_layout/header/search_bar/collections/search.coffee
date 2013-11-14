_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
SearchResult  = require '../models/search_result.coffee'

module.exports = class Search extends Backbone.Collection
  url: "#{sd.GRAVITY_URL}/api/v1/match?visible_to_public=true"

  _parse: (items) ->
    _.map items, (item) ->
      new SearchResult(item)
