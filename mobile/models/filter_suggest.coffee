_s = require 'underscore.string'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class FilterSuggest extends Backbone.Model

  url: ->
    if @get('type')
      "#{API_URL}/api/v1/search/filtered/#{@get 'type'}/#{@get 'id'}/suggest"
    else
      "#{API_URL}/api/v1/search/filtered/#{@get 'id'}/suggest"

  mediumsHash: (options) ->
    mediums = {}
    for label, count of @get('medium')
      mediums[_s.titleize _s.humanize label] = label
    mediums
