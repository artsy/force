_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
FilterSuggest = require './filter_suggest.coffee'
{ Image, Markdown } = require 'artsy-backbone-mixins'

module.exports = class Tag extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  urlRoot: "#{sd.API_URL}/api/v1/tag"

  href: -> "/tag/#{@get('id')}"

  displayName: -> @get('name')

  alphaSortKey: -> @get('id')

  fetchFilterSuggest: (params, options) ->
    new FilterSuggest(id: @get('id'), type: 'tag').fetch _.extend
      data: params
    , options
