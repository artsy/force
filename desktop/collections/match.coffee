Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Suggestion = require '../models/suggestion'

module.exports = class Match extends Backbone.Collection
  model: Suggestion

  url: ->
    "#{API_URL}/api/v1/match#{if @kind then '/' + @kind else ''}?visible_to_public=true"

  kind: null

  kinds: [
    'artworks'
    'artists'
    'fairs'
    'genes'
  ]
