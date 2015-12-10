sd = require('sharify').data
_ = require 'underscore'
_s = require 'underscore.string'
{ API_URL } = require('sharify').data
Backbone = require 'backbone'

{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class Tag extends Backbone.Model

  _.extend @prototype, Markdown

  urlRoot: "#{API_URL}/api/v1/tag"

  href: -> "/tag/#{@get('id')}"

  fetchFilterSuggest: (params, options) ->
    new Backbone.Model().fetch _.extend
      data: params
      url: "#{API_URL}/api/v1/search/filtered/tag/#{@get 'id'}/suggest"
    , options

  toPageTitle: -> "#{@get('name')} | Artsy"

  toPageDescription: ->
    if @get('description')
      _s.clean(@mdToHtmlToText('description'))
    else
      "Browse all artworks with the #{@get('name')} tag on Artsy. Artsy has the largest collection of art on the Web; browse art by subject matter, medium, size and price."
