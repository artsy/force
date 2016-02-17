{ API_URL } = require('sharify').data

module.exports =
  related: ->
    return @__related__ if @__related__?

    Artists = require '../../../collections/artists.coffee'
    Artworks = require '../../../collections/artworks.coffee'

    artists = new Artists
    artists.url = "#{API_URL}/api/v1/gene/#{@id}/artists?exclude_artists_without_artworks=true"

    artworks = new Artworks
    artworks.url = "#{@url()}/artworks?published=true"

    @__related__ =
      artists: artists
      artworks: artworks
