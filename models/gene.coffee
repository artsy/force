_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'
Backbone  = require 'backbone'
Artworks  = require '../collections/artworks.coffee'
Image     = require './mixins/image.coffee'
Artist    = require '../models/artist.coffee'

module.exports = class Gene extends Backbone.Model
  _.extend @prototype, Image

  urlRoot: "#{sd.ARTSY_URL}/api/v1/gene"

  clientUrl: -> "/gene/#{@get('id')}"

  href: -> "/gene/#{@get('id')}"

  displayName: -> @get('name')

  alphaSortKey: -> @get('id')

  initialize: ->
    @relatedArtists       = new Backbone.Collection [], model: Artist
    @relatedArtists.url   = "#{sd.ARTSY_URL}/api/v1/gene/#{@id}/artists"
    @trendingArtists      = new Backbone.Collection [], model: Artist
    @trendingArtists.url  = "#{sd.ARTSY_URL}/api/v1/artists/trending?gene=#{@get('name')}"

  fetchArtists: (type, options={}) ->
    @["#{type}Artists"].fetch(options)

  fetchArtworks: (options) ->
    artworks = new Artworks
    artworks.url = "#{@url()}/artworks"
    artworks.fetch options

  imageUrl: (version) ->
    @fullyQualifiedImageUrl(@get('image_url')).replace ':version', version
