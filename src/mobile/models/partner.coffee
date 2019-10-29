_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artist = require '../models/artist.coffee'
Icon = require '../models/icon.coffee'
Profile = require '../models/profile.coffee'
Artists = require '../collections/artists.coffee'
PartnerLocations = require '../collections/partner_locations.coffee'
PartnerShows = require '../collections/partner_shows.coffee'
fetchUntilEnd = require('artsy-backbone-mixins').Fetch().fetchUntilEnd
Relations = require './mixins/relations/partner.coffee'

INSTITUTION        = 'institution'
GALLERY_DEFAULT    = 'gallery_default'
GALLERY_DEPRECATED = 'gallery_deprecated'
GALLERY_ONE        = 'gallery_one'
GALLERY_TWO        = 'gallery_two'
GALLERY_THREE      = 'gallery_three'
GALLERY_FOUR       = 'gallery_four'
GALLERY_FIVE       = 'gallery_five'
GALLERY_SIX        = 'gallery_six'
GALLERY_SEVEN      = 'gallery_seven'

ACTIVE_PARTNER_LAYOUTS = [ INSTITUTION, GALLERY_ONE, GALLERY_TWO, GALLERY_THREE, GALLERY_FOUR, GALLERY_FIVE, GALLERY_SIX, GALLERY_SEVEN ]

module.exports = class Partner extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{sd.API_URL}/api/v1/partner"

  href: ->
    "/#{@get('default_profile_id')}"

  displayName: ->
    @get('name')

  fetchLocations: ->
    @related().locations.fetch arguments...

  fetchProfile: (options = {}) ->
    new Profile(id: @get('id')).fetch options

  nestedProfileImage: ->
    img = @get('profile')?.bestAvailableImage()
    return (if img? then img else '')

  icon: ->
    new Icon @get('icon'), profileId: @get('id')

  # Fetches the partners artists and groups them into represented and unrepresented.
  # The success callback provides (representedArtists, unrepresentedArtists).
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  fetchArtistGroups: (options = {}) ->
    partnerArtists = new Backbone.Collection
    partnerArtists.url = "#{sd.API_URL}/api/v1/partner/#{@get 'id'}/partner_artists"
    fetchUntilEnd.call partnerArtists,
      data:
        display_on_partner_profile: 1
        size: 20
        partner_id: @get('id')
        artists: 'artists'
      success: =>
        # Represented artists are flagged as represented but don't need artworks
        representedArtists = []

        # Unrepresented artists have artworks but are not represented
        unrepresentedArtists = []

        for pa in partnerArtists.models
          if pa.get('represented_by')
            representedArtists.push @artistFromPartnerArtist(pa)
          else if pa.get('published_artworks_count') > 0
            unrepresentedArtists.push @artistFromPartnerArtist(pa)

        options.success?(
          new Artists (representedArtists)
          new Artists (unrepresentedArtists)
        )
      error: options.error

  # Fetches the partner's shows and returns one as featured.
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  fetchFeaturedShow: (options = {}) ->
    partnerShows = new PartnerShows(null, partnerId: @get 'id')
    fetchUntilEnd.call partnerShows,
      data:
        partner_id: @get('id')
        shows: 'shows'
      success: ->
        options.success?(partnerShows.featuredShow())
      error: options.error

  hasSection: (section, profile, articles) ->
    switch section
      when 'articles'
        articles.length > 0
      when 'artists'
        profile.isGallery() and @get('partner_artists_count') > 0
      when 'collection'
        profile.isInstitution() and @get('published_not_for_sale_artworks_count') > 0
      when 'shop'
        profile.isInstitution() and @get('published_for_sale_artworks_count') > 0
      when 'shows'
        @get('displayable_shows_count') > 0
      else
        false

  setEmailFromLocations: (partnerLocations) ->
    return if @get 'email'
    try
      @set 'email', partnerLocations.first().get('email')

  getMailTo: ->
    return "" unless @get('email') and @get('type') is 'Gallery'
    subject = encodeURIComponent "Connecting with #{@get('name')} via Artsy"
    "mailto:#{@get('email')}?subject=#{subject}&cc=inquiries@artsy.net"

  getSimpleWebsite: ->
    return "" unless @get('website')
    @get('website').replace('http://', '').replace(/\/$/g, '')

  artistFromPartnerArtist: (partnerArtist) ->
    artist = new Artist partnerArtist.get('artist')
    # Rewrite image_url to use partner's cover image if exists
    if partnerArtist.has('image_versions') and partnerArtist.has('image_url')
      artist.set 'image_url': partnerArtist.get('image_url')
      artist.set 'image_versions': partnerArtist.get('image_versions')
    artist

module.exports.INSTITUTION        = INSTITUTION
module.exports.GALLERY_DEFAULT    = GALLERY_DEFAULT
module.exports.GALLERY_DEPRECATED = GALLERY_DEPRECATED
module.exports.GALLERY_ONE        = GALLERY_ONE
module.exports.GALLERY_TWO        = GALLERY_TWO
module.exports.GALLERY_THREE      = GALLERY_THREE
module.exports.GALLERY_FOUR       = GALLERY_FOUR
module.exports.GALLERY_FIVE       = GALLERY_FIVE
module.exports.GALLERY_SIX        = GALLERY_SIX
module.exports.GALLERY_SEVEN      = GALLERY_SEVEN

module.exports.ACTIVE_PARTNER_LAYOUTS = ACTIVE_PARTNER_LAYOUTS