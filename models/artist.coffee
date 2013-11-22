_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artwork = require '../models/artwork.coffee'

module.exports = class Artist extends Backbone.Model

  urlRoot: -> "#{sd.GRAVITY_URL}/api/v1/artist"

  initialize: ->
    @relatedArtists = new Backbone.Collection [], model: Artist
    @relatedArtists.url = "#{sd.GRAVITY_URL}/api/v1/related/layer/main/artists"
    @relatedContemporary = new Backbone.Collection [], model: Artist
    @relatedContemporary.url = "#{sd.GRAVITY_URL}/api/v1/related/layer/contemporary/artists"

  fetchRelatedArtists: (options = {}) ->
    @relatedArtists.fetch _.extend
      remove: false
      data: _.extend (options.data ? {}),
        size: 5
        'artist[]': @get 'id'
        'exclude_artists_without_artworks': true
    , options

  fetchRelatedContemporary: (options = {}) ->
    @relatedContemporary.fetch _.extend
      remove: false
      data: _.extend (options.data ? {}),
        size: 5
        'artist[]': @get 'id'
        'exclude_artists_without_artworks': true
    , options

  fetchArtworks: (options) ->
    col = new Backbone.Collection([], model: Artwork)
    col.url = "#{sd.GRAVITY_URL}/api/v1/artist/#{@get 'id'}/artworks"
    col.fetch options