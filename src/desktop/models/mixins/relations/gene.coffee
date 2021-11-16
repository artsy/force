{ API_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    { Artists } = require '../../../collections/artists'
    { Artworks } = require '../../../collections/artworks'

    artists = new Artists
    artists.url = "#{API_URL}/api/v1/gene/#{@id}/artists?exclude_artists_without_artworks=true"

    artworks = new Artworks
    artworks.url = "#{@url()}/artworks?published=true"

    family = new Backbone.Model @get('family')

    @__related__ =
      artists: artists
      artworks: artworks
      family: family
