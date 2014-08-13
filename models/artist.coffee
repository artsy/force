_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artworks = require '../collections/artworks.coffee'
{ Markdown } = require 'artsy-backbone-mixins'
{ Image } = require 'artsy-backbone-mixins'
{ smartTruncate } = require '../components/util/string.coffee'
{ SECURE_IMAGES_URL } = require('sharify').data
{ compactObject } = require './mixins/compact_object.coffee'

module.exports = class Artist extends Backbone.Model

  _.extend @prototype, Markdown
  _.extend @prototype, Image(SECURE_IMAGES_URL)

  sortCriteriaForArtworks:
    '': 'Relevance'
    '-published_at': 'Recently Added'

  validSort: (sort) ->
    _.contains(_.keys(@sortCriteriaForArtworks), sort)

  urlRoot: -> "#{sd.API_URL}/api/v1/artist"

  href: -> "/artist/#{@get('id')}"
  displayName: -> @get("name")

  initialize: ->
    @relatedArtists = new Backbone.Collection [], model: Artist
    @relatedArtists.url = "#{sd.API_URL}/api/v1/related/layer/main/artists"
    @relatedContemporary = new Backbone.Collection [], model: Artist
    @relatedContemporary.url = "#{sd.API_URL}/api/v1/related/layer/contemporary/artists"
    @relatedPosts = new Backbone.Collection [], model: require('./post.coffee')
    @relatedPosts.url = "#{sd.API_URL}/api/v1/related/posts"
    @relatedShows = new Backbone.Collection [], model: require('./partner_show.coffee')
    @relatedShows.url = "#{sd.API_URL}/api/v1/related/shows?artist[]=#{@id}"
    @artworks = new Artworks
    @artworks.url = "#{@url()}/artworks"

  fetchArtworks: (options={}) ->
    # Always include published=true
    # The api returns unpublised works for admins and gallery partners but we do not want to display them
    options.data ||= {}
    options.data.published = true
    @artworks.fetch options

  fetchRelatedArtists: (type, options = {}) ->
    @["related#{type}"].fetch _.extend
      remove: false
      data: _.extend (options.data ? {}),
        size: 5
        'artist[]': @get 'id'
        'exclude_artists_without_artworks': true
    , options

  fetchPosterArtwork: (options) ->
    @fetchArtworks
      data:
        page: 1
        size: 1
      success: (artworks) =>
        @set { poster_artwork: artworks.models[0] }
        @

  fetchRelatedPosts: (options = {}) ->
    @relatedPosts.fetch _.extend
      remove: false
      data: _.extend (options.data ? {}),
        size: 15
        'artist[]': @get 'id'
    , options

  toPageTitle: ->
    # A/B test artist page titles
    if /[a-h]/.exec(@id[0])
      "#{if @get('name') then @htmlToText('name') else 'Unnamed Artist'} | #{@pageTitleArtworksCount()}, Artist Biography | Artsy"
    else
      "#{if @get('name') then @htmlToText('name') else 'Unnamed Artist'} | Artist Biography, Artwork for Sale | Artsy"

  pageTitleArtworksCount: ->
    artworksCount =
      if @get('published_artworks_count') > 1000
        Math.floor(@get('published_artworks_count') / 1000) * 1000
      else if @get('published_artworks_count') > 100
        Math.floor(@get('published_artworks_count') / 100) * 100
      else if @get('published_artworks_count') > 20
        Math.floor(@get('published_artworks_count') / 20) * 20

    _.compact([
      if artworksCount then "#{artworksCount}+"
      "Artworks"
    ]).join(' ')

  toPageDescription: (length=200) ->
    smartTruncate(_.compact([
     "Find the latest shows, biography, and artworks for sale by #{@displayName()}"
     (if @get('blurb')?.length > 0 then @mdToHtmlToText('blurb') else undefined)
    ]).join(". "), length)

  toAuctionResultsPageTitle: ->
    "Auction Results for #{if @get('name') then @htmlToText('name') else 'Unnamed Artist'} on Artsy"

  toAuctionResultsPageDescription: ->
    name = if @get('name') then @htmlToText('name') else 'Unnamed Artist'
    "See details of #{name} auction results from recent, past, and upcoming sales. Let Artsy be your price guide to #{name}."

  isFollowed: (followArtistCollection) ->
    followArtistCollection && followArtistCollection.isFollowed(@)

  # Returns a string in the form of 'N available works & N reference works'
  #
  # @return {String}
  displayAvailableWorks: ->
    work = (n) -> if n > 1 then 'works' else 'work'
    string = (n, kind) -> "#{n} #{kind} #{work(n)}" if n

    _.compact([
      string(@get('forsale_artworks_count'), 'available')
      string((@get('published_artworks_count') - @get('forsale_artworks_count')), 'reference')
    ]).join ' & '

  toJSONLDShort: ->
    compactObject {
      "@type": "Person"
      image: @imageUrl('large')
      name: @displayName()
      sameAs: "#{sd.APP_URL}#{@href()}"
    }

  toJSONLD: ->
    compactObject {
      "@context": "http://schema.org"
      "@type": "Person"
      image: @imageUrl('large')
      name: @displayName()
      url: "#{sd.APP_URL}#{@href()}"
      gender: @get('gender')
      birthDate: @get('birthday')
      deathDate: @get('deathday')
      additionalType: 'Artist'
    }
