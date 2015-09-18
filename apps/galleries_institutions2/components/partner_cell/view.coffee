Backbone = require 'backbone'
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
Q = require 'bluebird-q'
{ FollowButton } = require '../../../../components/follow_button/index.coffee'

module.exports = class PartnerCell extends Backbone.View
  initialize: ({ @partner, @$el, @following }) ->
    @profile = new Profile id: @partner.get('default_profile_id')
    @$image = @$('.hoverable-image')
    new FollowButton
      following: @following
      modelName: 'profile'
      model: @profile
      el: @$('.partner-cell-follow-button')
    @fetchMetadata()


  getLocation: ->
    @partner.related().locations.fetch success: =>
      @$('.partner-cell-location').text @partner.displayLocations()

  getFeaturedShowImage: (options = {})->
    @partner.related().shows.fetch(
      success: (shows) ->
        show = shows.featured() || shows.models[0]
        imageUrl = show?.posterImageUrl()
        if imageUrl and not /missing_image.png/.test(imageUrl)
          options.success(imageUrl)
        else options.error()

      error: options.error
    )

  getProfileCoverImage: (options = {})->
    @profile.fetch(
      success: (profile) ->
        imageUrl = profile.coverImage()?.imageUrl('wide')
        if imageUrl and not /missing_image.png/.test(imageUrl)
          options.success(imageUrl)
        else options.error()

      error: options.error
    )

  setImage: (imageUrl, error) =>
    @$image.css backgroundImage: "url(#{imageUrl})"

  setInitials: =>
    @$image.attr 'data-initials', @profile.defaultIconInitials()
    @$image.addClass 'is-missing'

  getImage: ->
    @getFeaturedShowImage(
      success: @setImage,
      error: =>
        @getProfileCoverImage(
          success: @setImage
          error: @setInitials
      )
    )

  fetchMetadata: ->
    @getLocation()
    @getImage()

