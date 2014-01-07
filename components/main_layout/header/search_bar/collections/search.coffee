_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
SearchResult  = require '../../../../../models/search_result.coffee'
analytics     = require '../../../../../lib/analytics.coffee'

module.exports = class Search extends Backbone.Collection
  url: "#{sd.ARTSY_URL}/api/v1/match?visible_to_public=true"

  _parse: (items) ->
    analytics.funnel "Searched from header, with results"
    _.map items, (item) ->
      new SearchResult(item)
