_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
CoverImage    = require './cover_image.coffee'
Icon          = require './icon.coffee'
{ Markdown }  = require 'artsy-backbone-mixins'

_.mixin(require 'underscore.string')

module.exports = class Profile extends Backbone.Model

  _.extend @prototype, Markdown

  GALLERY_OWNER_TYPES: ['PartnerGallery']
  USER_OWNER_TYPES: [ 'User', 'Admin' ]
  INSTITUTION_OWNER_TYPES: [
    'PartnerMuseum', 'PartnerArtistEstate', 'PartnerPrivateCollection',
    'PartnerFoundation', 'PartnerPublicDomain', 'PartnerImageArchive', 'PartnerNonProfit'
  ]

  urlRoot: "#{sd.ARTSY_URL}/api/v1/profile"

  icon: ->
    new Icon @get('icon'), profileId: @get('id')

  iconImageUrl: ->
    @icon().imageUrl @get('default_icon_version')

  coverImage: ->
    new CoverImage @get('cover_image'), profileId: @get('id')

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
      iconInitials = _.reduce(@displayName().split(' '), reduceFunction, '')[0..1]
    iconInitials

  getFormattedWebsite: ->
    if @has 'website'
      @get('website').replace('http://', '').replace('https://', '')

  isUser:        -> _.contains @USER_OWNER_TYPES, @get('owner_type')
  isInstitution: -> _.contains @INSTITUTION_OWNER_TYPES, @get('owner_type')
  isGallery:     -> _.contains @GALLERY_OWNER_TYPES, @get('owner_type')
  isPartner:     -> ! _.contains ['User', 'Admin'], @get('owner_type')
  isFairOranizer: -> @get('owner_type') == 'FairOrganizer'

  isMe: ->
    return @get('isCurrentUser') if @has('isCurrentUser')
    @set
      isCurrentUser: @get('id') == sd.CURRENT_USER?.default_profile_id
    @get('isCurrentUser')

  formatFollowText: ->
    return unless @has('follows_count')
    follows = @get('follows_count')
    "#{_.numberFormat(follows)} Follower#{if follows is 1 then '' else 's'}"

  metaTitle: ->
    _.compact([
      (if @displayName() then "#{@displayName()}" else "Profile")
      (if @isGallery() then "Artists, Art for Sale, and Contact Info" else null)
      (if @isPartner() and !@isGallery() then "Artists, Artworks, and Contact Info" else null)
      (if @isFairOranizer() then "Fair Info, Artists, and Art for Sale" else null)
      "Artsy"
    ]).join(" | ")

  metaDescription: ->
    if @get('bio')
      @get('bio')
    else
      if @displayName() then "#{@displayName()} on Artsy" else "Profile on Artsy"

  isCurrentProfile: ->
    sd.CURRENT_USER?.default_profile_id == @get('id')

  hasPosts: ->
    @get('posts_count') > 0 or @get('reposts_count') > 0
