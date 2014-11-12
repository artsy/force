_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
{ Markdown, Image } = require 'artsy-backbone-mixins'
{ smartTruncate } = require '../components/util/string.coffee'
{ SECURE_IMAGES_URL } = require('sharify').data
{ compactObject } = require './mixins/compact_object.coffee'
Relations = require './mixins/relations/artist.coffee'

module.exports = class Artist extends Backbone.Model
  _.extend @prototype, Markdown
  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, Relations

  urlRoot: ->
    "#{sd.API_URL}/api/v1/artist"

  href: ->
    "/artist/#{@get('id')}"

  displayName: ->
    @get 'name'

  fetchArtworks: (options = {}) ->
    @related().artworks.fetch options

  fetchRelatedArtists: (type, options = {}) ->
    @related()[type.toLowerCase()].fetch _.extend
      remove: false
      data: _.defaults (options.data ? {}), size: 5
    , options

  fetchPosterArtwork: ->
    @fetchArtworks
      data: page: 1, size: 1
      success: (artworks) =>
        @set poster_artwork: artworks.models[0]

  # Helper for A/B test artist page titles / descriptions
  inFirstArtistTestGroup: -> /[a-h]/.exec(@id[0])

  genderPronoun: ->
    switch @get('gender')
      when 'male' then 'his'
      when 'female' then 'her'
      else
        'their'

  toPageTitle: ->
    if @inFirstArtistTestGroup()
      "#{if @get('name') then @htmlToText('name') else 'Unnamed Artist'} | #{@pageTitleArtworksCount()}, Artist Biography | Artsy"
    else
      "#{if @get('name') then @htmlToText('name') else 'Unnamed Artist'} - Explore #{@genderPronoun()} Artworks, Biography & Shows on Artsy"

  pageTitleArtworksCount: ->
    artworksCount = @get('published_artworks_count')
    _.compact([
      artworksCount
      "Artworks"
    ]).join(' ')

  toPageDescription: (length=200) ->
    if @inFirstArtistTestGroup()
      smartTruncate(_.compact([
       "Find the latest shows, biography, and artworks for sale by #{@displayName()}"
       (if @get('blurb')?.length > 0 then @mdToHtmlToText('blurb') else undefined)
      ]).join(". "), length)
    else
      "Browse the best of #{@displayName()}, including artwork for sale, #{@genderPronoun()} latest shows & events, biography, and exclusive #{@displayName()} articles."

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

  displayNationalityAndBirthdate: ->
    _.compact([
      @get('nationality')
      @get('years')
    ]).join ', '

  displayFollowers: ->
    if c = @get 'follow_count'
      "#{_s.numberFormat(c)} Follower#{if c is 1 then '' else 's'}"

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
      datePublished: @get('lastModified')
    }
