sd = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
CoverImage = require './cover_image'
Icon = require './icon'

{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class Profile extends Backbone.Model

  _.extend @prototype, Markdown

  urlRoot: -> "#{sd.API_URL}/api/v1/profile"

  href: ->
    "/#{@get 'id'}"

  hasIcon: ->
    @has('icon') and not _.isUndefined @get('icon')

  hasCover: ->
    @has('cover_image') and not _.isEmpty @get('cover_image') and not _.isUndefined @get('cover_image')

  icon: ->
    new Icon _.extend(@get('icon') || {}, profileId: @get('id'))

  iconUrl: ->
    @icon().imageUrl()

  coverImage: ->
    new CoverImage @get('cover_image'), profileId: @get('id')

  coverImageUrl: ->
    @coverImage().imageUrl 'medium'

  bestAvailableImage: ->
    if @hasCover()
      @coverImage().imageUrl('medium250x165')
    else
      @iconUrl()

  initials: ->
    reduceFunction = (result, name) ->
      return result unless name[0] and /\w/.test name[0]
      result + name[0]
    iconInitials = _.reduce(@displayName()?.split(' '), reduceFunction, '')[0..1]

  displayName: ->
    @get('owner')?.name

  alphaSortKey: ->
    @displayName()

  isFairOrganizer: -> @get('owner_type') == 'FairOrganizer'
  isFairOrOrganizer: -> @isFairOrganizer() || @isFair()
  isFair: -> @get('owner_type') == 'Fair'

  # Get either the default fair id (from FairOrganizer)
  # or the id (from Fair)
  fairOwnerId: ->
    @get('owner').default_fair_id || @get('owner').id

  isGallery: -> @get('owner_type') is 'PartnerGallery'

  isInstitution: ->
    institutionOwnerTypes = [
      'PartnerBrand',
      'PartnerInstitution',
      'PartnerInstitutionalSeller'
    ]
    _.contains institutionOwnerTypes, @get('owner_type')

  isPartner: -> @isGallery() or @isInstitution()

  isUser: -> _.contains ['User', 'Admin'], @get('owner_type')
