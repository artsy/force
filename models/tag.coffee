_ = require 'underscore'
{ ARTSY_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports = class Tag extends Backbone.Model

  urlRoot: "#{ARTSY_URL}/api/v1/tag"

  fetchFilterSuggest: (params, options) ->
    new Backbone.Model().fetch _.extend
      data: params
      url: "#{ARTSY_URL}/api/v1/search/filtered/tag/#{@get 'id'}/suggest"
    , options