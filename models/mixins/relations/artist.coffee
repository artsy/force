{ API_URL, APP_URL } = require('sharify').data
Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    # Deferred requires:
    Artist = require '../../artist.coffee'
    PartnerShows = require '../../../collections/partner_shows.coffee'
    Artworks = require '../../../collections/artworks.coffee'
    WebArticles = Books = require '../../../components/artsypedia/collection.coffee'
    Articles = require '../../../collections/articles.coffee'

    # Setup:
    artists = new Backbone.Collection [], model: Artist
    artists.url = "#{API_URL}/api/v1/related/layer/main/artists?artist[]=#{@id}&exclude_artists_without_artworks=true"

    contemporary = new Backbone.Collection [], model: Artist
    contemporary.url = "#{API_URL}/api/v1/related/layer/contemporary/artists?artist[]=#{@id}&exclude_artists_without_artworks=true"

    shows = new PartnerShows
    shows.url = "#{API_URL}/api/v1/related/shows?artist[]=#{@id}&sort=-end_at&displayable=true"
    shows.comparator = (show) ->
      if show.isFairBooth()
        1
      else if show.isSolo()
        -1
      else
        0

    artworks = new Artworks
    artworks.url = "#{@url()}/artworks?published=true"

    webArticles = new WebArticles
    webArticles.url = "#{APP_URL}/artist/data/#{@id}/publications?merchandisable[]=false"

    articles = new Articles
    articles.url += "?artist_id=#{@get '_id'}&published=true"

    merchandisable = new Books
    merchandisable.url = "#{APP_URL}/artist/data/#{@id}/publications?merchandisable[]=true"

    bibliography = new Backbone.Collection
    bibliography.url = "#{APP_URL}/artist/data/#{@id}/publications"

    collections = new Backbone.Collection
    collections.url = "#{APP_URL}/artist/data/#{@id}/collections"

    exhibitions = new Backbone.Collection
    exhibitions.url = "#{APP_URL}/artist/data/#{@id}/exhibitions"

    # Return:
    @__related__ =
      artists: artists
      contemporary: contemporary
      shows: shows
      artworks: artworks
      webArticles: webArticles
      articles: articles
      merchandisable: merchandisable
      bibliography: bibliography
      collections: collections
      exhibitions: exhibitions
