_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
{ Artworks } = require '../collections/artworks'
{ Image, Markdown } = require '@artsy/backbone-mixins'
Artist = require '../models/artist.coffee'
Relations = require './mixins/relations/gene.coffee'

SUBJECT_MATTER_MATCHES = [
  "content", "medium", "concrete contemporary",
  "abstract contemporary", "concept", "technique", "appearance genes"
]

module.exports = class Gene extends Backbone.Model
  _.extend @prototype, Relations
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  urlRoot: "#{sd.API_URL}/api/v1/gene"

  href: -> "/gene/#{@get('id')}"

  displayName: -> @get('display_name') or @get('name')

  familyName: -> @related().family.get('name')

  alphaSortKey: -> @get('id')

  toPageTitle: ->
    if title = @metaOverrides('title')
      title
    else
      "#{@displayName()} | Artsy"

  # Trim whitespace and newlines
  toPageDescription: ->
    if description = @metaOverrides('description')
      description
    else if @isGeographic()
      "Explore art by artists who are from, or who have lived in, #{@get('name')}. Browse works by size, price, and medium."
    else
      _s.clean(@mdToHtmlToText('description'))

  initialize: ->
    @relatedArtists = new Backbone.Collection [], model: Artist
    @relatedArtists.url = "#{sd.API_URL}/api/v1/gene/#{@id}/artists?exclude_artists_without_artworks=true"
    @trendingArtists = new Backbone.Collection [], model: Artist
    @trendingArtists.url = "#{sd.API_URL}/api/v1/artists/trending?gene=#{@id}"

  fetchArtists: (type, options={}) ->
    @["#{type}Artists"].fetch(options)

  fetchArtworks: (options) ->
    artworks = new Artworks
    artworks.url = "#{@url()}/artworks"
    artworks.fetch options

  isGeographic: ->
    @get('type')?.name?.includes('Geographical Regions and Countries')

  isSubjectMatter: ->
    @get('type')?.name?.match new RegExp SUBJECT_MATTER_MATCHES.join('|'), 'i'

  mode: ->
    if @isSubjectMatter() then 'artworks' else 'artist'

  fetchFilterSuggest: (params, options) ->
    new Backbone.Model().fetch _.extend
      data: params
      url: "#{sd.API_URL}/api/v1/search/filtered/gene/#{@get 'id'}/suggest"
    , options

  metaOverrides: (tag) ->
    metaOverrides(this)[@id]?[tag]

  # support custom gene titles + descriptions
  metaOverrides = (model) ->
    'western-europe':
      description: 'Discover Western European artists from pre-history to present, and browse works by size, prize and medium.'

    'latin-america-and-the-caribbean':
      description: 'Discover artists from Latin America and the Caribbean from pre-history to present, and browse works by size, prize and medium.'

    'africa':
      description: 'Explore the art of Africa, including traditional Sub-Saharan art, modern photography, and contemporary art.'

    'middle-east':
      description: 'Discover Middle Eastern artists and explore art from the region from pre-history to present (Mesopotamian art, ancient Egyptian art, Islamic art, and contemporary Middle Eastern artists).'
