_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
Artists = require '../collections/artists.coffee'
FilterSuggest = require './filter_suggest.coffee'

{ Image, Markdown } = require 'artsy-backbone-mixins'

SUBJECT_MATTER_MATCHES = [
  "content", "medium", "concrete contemporary",
  "abstract contemporary", "concept", "technique", "appearance genes"
]

module.exports = class Gene extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  initialize: ->
    @trendingArtists = new Artists
    @trendingArtists.url = "#{sd.API_URL}/api/v1/artists/trending?gene=#{@get('id')}"

  urlRoot: "#{sd.API_URL}/api/v1/gene"

  href: -> "/gene/#{@get('id')}"

  displayName: -> @get('name')

  alphaSortKey: -> @get('id')

  isSubjectMatter: ->
    @get('type')?.name?.match new RegExp SUBJECT_MATTER_MATCHES.join('|'), 'i'

  fetchFilterSuggest: (params, options) ->
    new FilterSuggest(id: @get('id'), type: 'gene').fetch _.extend
      data: params
    , options

  fetchTrendingArtists: (options = {}) ->
    @trendingArtists.fetch _.extend options
