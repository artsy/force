_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
CoverImage = require './cover_image.coffee'
Icon = require './icon.coffee'
Artworks = require '../collections/artworks.coffee'
{ Markdown } = require 'artsy-backbone-mixins'
{ compactObject } = require './mixins/compact_object.coffee'

module.exports = class Profile extends Backbone.Model

  _.extend @prototype, Markdown

  GALLERY_OWNER_TYPES: ['PartnerGallery']
  USER_OWNER_TYPES: [ 'User', 'Admin' ]
  INSTITUTION_OWNER_TYPES: [
    'PartnerMuseum', 'PartnerArtistEstate', 'PartnerPrivateCollection',
    'PartnerFoundation', 'PartnerPublicDomain', 'PartnerImageArchive', 'PartnerNonProfit'
  ]

  urlRoot: "#{sd.API_URL}/api/v1/profile"

  icon: ->
    new Icon _.extend(@get('icon') || {}, profileId: @get('id'))

  iconImageUrl: ->
    @icon().imageUrl()

  coverImage: ->
    new CoverImage @get('cover_image'), profileId: @get('id')

  bestAvailableImage: ->
    if @has('cover_image')
      @coverImage().imageUrl('medium')
    else
      @iconImageUrl()

  alphaSortKey: ->
    @displayName()

  href: ->
    "/#{@get('id')}"

  displayName: ->
    @get('owner')?.name

  defaultIconInitials: ->
    iconInitials = ''
    if @isPartner()
      reduceFunction = (result, name) ->
        return result unless name[0] and /\w/.test name[0]
        result + name[0]
      iconInitials = _.reduce(@displayName()?.split(' '), reduceFunction, '')[0..1]
    iconInitials

  getFormattedWebsite: ->
    if @has 'website'
      @get('website').replace('http://', '').replace('https://', '')

  isUser: -> _.contains @USER_OWNER_TYPES, @get('owner_type')
  isInstitution: -> _.contains @INSTITUTION_OWNER_TYPES, @get('owner_type')
  isGallery: -> _.contains @GALLERY_OWNER_TYPES, @get('owner_type')
  isPartner: -> @isGallery() or @isInstitution()
  isFairOranizer: -> @get('owner_type') == 'FairOrganizer'

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

  metaTitle: (tab) ->
    _.compact([
      (if @displayName() then "#{@displayName()}" else "Profile")
      (if @isGallery() then "Artists, Art for Sale, and Contact Info" else null)
      (if @isPartner() and !@isGallery() and !@isFairOranizer() then "Artists, Artworks, and Contact Info" else null)
      (if @isFairOranizer() then @fairMetaTitle(tab) else null)
      "Artsy"
    ]).join(" | ")

  fairMetaTitle: (tab) ->
    if tab is 'info'
      "Visitor Information"
    else if tab is 'posts'
       "Read Highlights from the Fair"
    else if tab is 'forYou'
      "Your Personal Fair Guide"
    else
      "Fair Info, Artists, and Art for Sale"

  metaDescription: ->
    if @get('bio')
      @get('bio')
    else
      if @displayName() then "#{@displayName()} on Artsy" else "Profile on Artsy"

  isCurrentProfile: ->
    sd.CURRENT_USER?.default_profile_id == @get('id')

  hasPosts: ->
    @get('posts_count') > 0 or @get('reposts_count') > 0

  fetchFavorites: (options) ->
    favorites = new Artworks
    favorites.url = "#{sd.API_URL}/api/v1/collection/saved-artwork/artworks"
    favorites.params = _.extend {
      sort: '-position'
      user_id: @get('owner').id
      private: true
      page: 1
    }, options.data
    favorites.fetch _.extend options, data: favorites.params

  fetchPosts: (options) ->
    # Avoid circular dependency by lazy-requiring
    FeedItems = require '../components/feed/collections/feed_items.coffee'
    success = options.success
    url = "#{sd.API_URL}/api/v1/profile/#{@get 'id'}/posts"
    new FeedItems().fetch _.extend options,
      url: url
      data: { size: 3 }
      error: options.error
      success: (items) ->
        items.urlRoot = url if items.length
        success items

  toJSONLD: ->
    compactObject {
      "@context": "http://schema.org"
      "@type": if @isUser() then "Person" else "Organization"
      image: @iconImageUrl()
      name: @displayName()
      url: "#{sd.APP_URL}#{@href()}"
    }
