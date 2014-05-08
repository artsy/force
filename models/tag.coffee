_ = require 'underscore'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports = class Tag extends Backbone.Model

  urlRoot: "#{API_URL}/api/v1/tag"

  fetchFilterSuggest: (params, options) ->
    new Backbone.Model().fetch _.extend
      data: params
      url: "#{API_URL}/api/v1/search/filtered/tag/#{@get 'id'}/suggest"
    , options
