{ API_URL, APP_URL, POSITRON_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    Artist = require '../../artist.coffee'
    { PartnerShows } = require '../../../collections/partner_shows'
    { Artworks } = require '../../../collections/artworks'
    { Articles } = require '../../../collections/articles'

    artists = new Backbone.Collection [], model: Artist
    artists.url = "#{API_URL}/api/v1/related/layer/main/artists?artist[]=#{@id}&exclude_artists_without_artworks=true"

    contemporary = new Backbone.Collection [], model: Artist
    contemporary.url = "#{API_URL}/api/v1/related/layer/contemporary/artists?artist[]=#{@id}&exclude_artists_without_artworks=true"

    shows = new PartnerShows
    shows.url = "#{API_URL}/api/v1/related/shows?artist_id=#{@id}&sort=-end_at&displayable=true"
    shows.comparator = (show) ->
      if show.isFairBooth()
        1
      else if show.isSolo()
        -1
      else
        0

    artworks = new Artworks
    artworks.url = "#{@url()}/artworks?published=true"

    articles = new Articles
    articles.url = =>
      "#{POSITRON_URL}/api/articles?artist_id=#{@get '_id'}&published=true"

    @__related__ =
      artists: artists
      contemporary: contemporary
      shows: shows
      artworks: artworks
      articles: articles
