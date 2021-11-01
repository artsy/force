_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
CoverImage = require './cover_image.coffee'
Icon = require './icon.coffee'
{ Artworks } = require '../collections/artworks'
{ Markdown } = require '@artsy/backbone-mixins'
{ compactObject } = require './mixins/compact_object.coffee'
Relations = require './mixins/relations/profile.coffee'

module.exports = class Profile extends Backbone.Model
  _.extend @prototype, Relations
  _.extend @prototype, Markdown

  GALLERY_OWNER_TYPES: ['PartnerGallery']
  USER_OWNER_TYPES: [ 'User', 'Admin' ]
  INSTITUTION_OWNER_TYPES: [
    'PartnerBrand',
    'PartnerInstitution',
    'PartnerInstitutionalSeller'
  ]

  urlRoot: "#{sd.API_URL}/api/v1/profile"

  icon: ->
    new Icon _.extend(@get('icon') || {}, profileId: @get('id'))

  iconImageUrl: ->
    @icon().imageUrl()

  hasIconImage: ->
    @iconImageUrl() isnt Icon.DefaultUserIconUrl

  coverImage: ->
    new CoverImage @get('cover_image'), profileId: @get('id')

  bestAvailableImage: ->
    if @has('cover_image')
      @coverImage().imageUrl()
    else
      # For partners, this should never happen
      @iconImageUrl()

  alphaSortKey: ->
    @displayName()

  href: ->
    "/#{@get('id')}"

  displayName: ->
    @related().owner.get('name')

  defaultIconInitials: ->
    if @isPartner() then @related().owner?.defaultIconInitials() else ''

  getFormattedWebsite: ->
    if @has 'website'
      @get('website').replace('http://', '').replace('https://', '')

  isUser: -> _.contains @USER_OWNER_TYPES, @get('owner_type')
  isInstitution: -> _.contains @INSTITUTION_OWNER_TYPES, @get('owner_type')
  isGallery: -> _.contains @GALLERY_OWNER_TYPES, @get('owner_type')
  isPartner: -> @isGallery() or @isInstitution()
  isFairOrganizer: -> @get('owner_type') == 'FairOrganizer'
  isFairOrOrganizer: -> @isFairOrganizer() || @isFair()
  isFair: -> @get('owner_type') == 'Fair'

  # Get either the default fair id (from FairOrganizer)
  # or the id (from Fair)
  fairOwnerId: ->
    @related().owner.get('default_fair_id') || @related().owner.get('id')

  profileType: ->
    if @isUser()
      'Person'
    else if @isInstitution()
      'Institution'
    else if @isGallery()
      'Gallery'
    else if @isFair()
      'Fair'
    else if @isFairOrganizer()
      'FairOrganizer'

  isUserClass: ->
    if @isUser() && @get('default_icon_version') is 'circle'
      'is-user'
    else
      'is-partner'

  isMe: ->
    return @get('isCurrentUser') if @has('isCurrentUser')
    @set
      isCurrentUser: @get('id') == sd.CURRENT_USER?.default_profile_id
    @get('isCurrentUser')

  formatFollowText: ->
    return unless @has('follows_count')
    follows = @get('follows_count')
    "#{_s.numberFormat(follows)} Follower#{if follows is 1 then '' else 's'}"

  isCurrentProfile: ->
    sd.CURRENT_USER?.default_profile_id == @get('id')

  fetchFavorites: (options) ->
    favorites = new Artworks
    favorites.url = "#{sd.API_URL}/api/v1/collection/saved-artwork/artworks"
    favorites.params = _.extend {
      sort: '-position'
      user_id: @related().owner.get('id')
      private: true
      page: 1
    }, options.data
    favorites.fetch _.extend options, data: favorites.params

  toJSONLD: ->
    compactObject {
      "@context": "http://schema.org"
      "@type": if @isUser() then "Person" else "Organization"
      image: @iconImageUrl()
      name: @displayName()
      url: "#{sd.APP_URL}#{@href()}"
    }



  #
  # Logic for page titles and description
  #

  # TITLE
  fairTitle:
    forYou: "Your Personal Fair Guide"
    posts: "Highlighted Articles"
    info: "Visitor Information"
    search: "Search"
    browse: "Browse"
    favorites: "Favorites"
    follows: "Following"

  partnerTitle:
    overview: null # Conditional
    contact: "Contact Information"
    about: "Visitor Information"
    collection: "Collection"
    shop: "Shop"
    shows: "Shows"
    artists: "Artists"
    artist: null  # Canonical redirects to artist page
    posts: "Posts"

  metaTitle: (tab) ->
    _.compact([
      (if @displayName() then "#{@displayName()}" else "Profile")
      (if @isPartner() and !@isFairOrganizer() then @partnerMetaTitle(tab) else null)
      (if @isFairOrganizer() then @fairMetaTitle(tab) else null)
      "Artsy"
    ]).join(" | ")

  fairMetaTitle: (tab) ->
    if text = @fairTitle[tab]
      text
    else
      "Fair Info, Artists, and Art for Sale"

  partnerMetaTitle: (tab) ->
    if text = @partnerTitle[tab]
      text
    else
      if @isGallery() then "Artists, Art for Sale, and Contact Info" else "Artists, Artworks, and Contact Info"


  # DESCRIPTION
  partnerDescription:
    overview: null # Conditional
    contact: "Contact information including a map of locations with phone numbers for"
    about: "Visitor information including location and phone number for"
    collection: "Artworks in the collection of"
    shop: null
    shows: "List of current, upcoming and past shows at"
    artists: "List of artists represented by"
    artist: null  # Canonical redirects to artist page
    posts: "Articles about and created by"

  fairDescription:
    forYou: null # Private
    posts: "Featured articles about the fair"
    info: "Visitor information including location, tickets and phone number for the fair"
    search: null # Hopefully not indexed
    browse: "Browse artworks at the fair by subject matter, style/technique, movement, price, and booth"
    favorites: null # Private
    follows: null # Private

  partnerMetaDescription: (tab) ->
    if text = @partnerDescription[tab]
      [text, @displayName()].join(' ')
    else
      @profileMetaDescription()

  fairMetaDescription: (tab) ->
    if text = @fairDescription[tab]
      text
    else
      @profileMetaDescription()

  profileMetaDescription: ->
    if @get('bio')
      @get('bio')
    else if @isGallery()
      "Explore Artists, Artworks, and Shows from #{@displayName()} on Artsy"
    else
      if @displayName() then "#{@displayName()} on Artsy" else "Profile on Artsy"

  metaDescription: (tab) ->
    if @isPartner() and !@isFairOrganizer()
      @partnerMetaDescription(tab)
    else if @isFairOrganizer()
      @fairMetaDescription(tab)
    else
      @profileMetaDescription()
