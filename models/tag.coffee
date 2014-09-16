sd = require('sharify').data
_ = require 'underscore'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'

{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class Tag extends Backbone.Model

  _.extend @prototype, Markdown

  urlRoot: "#{API_URL}/api/v1/tag"

  fetchFilterSuggest: (params, options) ->
    new Backbone.Model().fetch _.extend
      data: params
      url: "#{API_URL}/api/v1/search/filtered/tag/#{@get 'id'}/suggest"
    , options

  toPageTitle: -> "#{@get('name')} | Artsy"
  toPageDescription: -> "Artworks with the #{@get('name')} tag on Artsy"
