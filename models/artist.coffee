_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
{ Markdown, Image, Fetch } = require 'artsy-backbone-mixins'
{ smartTruncate } = require '../components/util/string.coffee'
{ SECURE_IMAGES_URL, API_URL } = require('sharify').data
{ compactObject } = require './mixins/compact_object.coffee'
Relations = require './mixins/relations/artist.coffee'
MetaOverrides = require './mixins/meta_overrides.coffee'
ImageSizes = require './mixins/image_sizes.coffee'

module.exports = class Artist extends Backbone.Model
  _.extend @prototype, Markdown
  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, Relations
  _.extend @prototype, MetaOverrides
  _.extend @prototype, Fetch(API_URL)
  _.extend @prototype, ImageSizes

  defaultMetaTitle: ->
    "#{@metaName()} - #{@pageTitleArtworksCount()}, Bio & Shows on Artsy"

  urlRoot: ->
    "#{sd.API_URL}/api/v1/artist"

  href: ->
    "/artist/#{@get('id')}"

  displayName: ->
    @get 'name'

  metaName: ->
    if @get('name') then @htmlToText('name') else 'Unnamed Artist'

  fetchArtworks: (options = {}) ->
    @related().artworks.fetch options

  hasNoContent: ->
    @get('published_artworks_count') is 0 and @get('biography') is ''

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

  alternateNames: ->
    if alts = @get('alternate_names') then alts.join('; ') else ''

  pageTitleArtworksCount: (threshold = 1) ->
    count = @get('published_artworks_count')
    if count <= threshold or not count? then 'Artworks' else "#{count} Artworks"

  defaultMetaDescription: (length = 200) ->
    if @inFirstArtistTestGroup()
      smartTruncate(_.compact([
       "Find the latest shows, biography, and artworks for sale by #{@displayName()}"
       (if @get('blurb')?.length > 0 then @mdToHtmlToText('blurb') else undefined)
      ]).join(". "), length)
    else
      "Browse the best of #{@displayName()}, including artwork for sale, #{@genderPronoun()} latest shows & events, biography, and exclusive #{@displayName()} articles."

  toAuctionResultsPageTitle: ->
    "Auction Results for #{@metaName()} on Artsy"

  toAuctionResultsPageDescription: ->
    "See details of #{@metaName()} auction results from recent, past, and upcoming sales. Let Artsy be your price guide to #{@metaName()}."

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
      datePublished: @get('createdAt')
      dateModified: @get('lastModified')
    }
