_          = require 'underscore'
sd         = require('sharify').data
Backbone   = require 'backbone'
CoverImage = require './cover_image.coffee'
Icon       = require './icon.coffee'

module.exports = class Profile extends Backbone.Model

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
    "#{sd.ARTSY_URL}/#{@get('id')}"

  displayName: ->
    @get('owner')?.name

  isPartner: ->
    ! _.contains ['User', 'Admin'], @get('owner_type')

  defaultIconInitials: ->
    iconInitials = ''
    if @isPartner()
      reduceFunction = (result, name) ->
        return result unless name[0] and /\w/.test name[0]
        result + name[0]
      iconInitials = _.reduce(@displayName().split(' '), reduceFunction, '')[0..1]
    iconInitials
