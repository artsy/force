Backbone = require 'backbone'
sd = require('sharify').data
Artworks = require '../collections/artworks'
FilteredArtworks = require '../collections/filter_artworks'
Artists = require '../collections/artists'
_ = require 'underscore'
{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class Artist extends Backbone.Model
  _.extend @prototype, Markdown

  urlRoot: -> "#{sd.API_URL}/api/v1/artist"

  href: -> "/artist/#{@get('id')}"

  imageUrl: (version = 'medium') ->
    @get('image_url')?.replace ':version', version

  defaultImageUrl: ->
    return @imageUrl('tall') if @hasImage('tall')
    return @imageUrl('four_thirds') if @hasImage('four_thirds')
    @imageUrl()

  hasImage: (size = 'tall') ->
    size in (@get('image_versions') || [])

  maybeFetchAndSetFeaturedBio: (cb = ->) ->
    return cb() if @get('blurb')
    partner_artists = new Backbone.Collection()
    partner_artists.url = "#{sd.API_URL}/api/v1/artist/#{@get('id')}/partner_artists?size=1&featured=true"
    partner_artists.fetch
      success: (featured) =>
        return cb() unless featured.length and featured.models[0].has('biography')
        @set 'blurb', featured.models[0].get('biography')
        cb()

  fetchArtworks: (options = {}) ->
    artworks = new Artworks
    artworks.url = @url() + '/artworks'
    artworks.fetch options

  fetchFilteredArtworks: (options = {}) ->
    artworks = new FilteredArtworks
    artworks.fetch options

  fetchRelatedArtists: (options = {}) ->
    artists = new Artists
    artists.url = "#{sd.API_URL}/api/v1/related/layer/main/artists"
    artists.fetch _.extend options, data:
      exclude_artists_without_artworks: true
      'artist[]': @get 'id'

  fetchAuctionResults: (options = {}) ->
    new Backbone.Collection().fetch _.extend options,
      url: "#{sd.API_URL}/api/v1/artist/#{@get 'id'}/auction_lots?total_count=1"
