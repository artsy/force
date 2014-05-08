_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'
Artworks  = require '../collections/artworks.coffee'
{ Image, Markdown } = require 'artsy-backbone-mixins'
Artist    = require '../models/artist.coffee'

SUBJECT_MATTER_MATCHES = [
  "content", "medium", "concrete contemporary",
  "abstract contemporary", "concept", "technique", "appearance genes"
]

module.exports = class Gene extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  urlRoot: "#{sd.API_URL}/api/v1/gene"

  clientUrl: -> "/gene/#{@get('id')}"

  href: -> "/gene/#{@get('id')}"

  displayName: -> @get('name')

  alphaSortKey: -> @get('id')

  initialize: ->
    @relatedArtists       = new Backbone.Collection [], model: Artist
    @relatedArtists.url   = "#{sd.API_URL}/api/v1/gene/#{@id}/artists"
    @trendingArtists      = new Backbone.Collection [], model: Artist
    @trendingArtists.url  = "#{sd.API_URL}/api/v1/artists/trending?gene=#{@id}"

  fetchArtists: (type, options={}) ->
    @["#{type}Artists"].fetch(options)

  fetchArtworks: (options) ->
    artworks = new Artworks
    artworks.url = "#{@url()}/artworks"
    artworks.fetch options

  isSubjectMatter: ->
    @get('type')?.name?.match new RegExp SUBJECT_MATTER_MATCHES.join('|'), 'i'

  fetchFilterSuggest: (params, options) ->
    new Backbone.Model().fetch _.extend
      data: params
      url: "#{sd.API_URL}/api/v1/search/filtered/gene/#{@get 'id'}/suggest"
    , options
