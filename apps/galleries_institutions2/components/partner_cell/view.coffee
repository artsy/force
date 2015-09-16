{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
Backbone = require 'backbone'
{ CURRENT_USER } = require('sharify').data
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
Q = require 'bluebird-q'

module.exports = class PartnerCell extends Backbone.View
  initialize: ({ @partner, @$el }) ->
    @profile = new Profile id: @partner.get('default_profile_id')
    @$image = @$('.hoverable-image')

    @fetchMetadata()

    following = new Following([], kind: 'profile') if CURRENT_USER?

    new FollowButton
      el: $('.partner-cell-follow-button')
      following: following
      model: @profile
      modelName: 'profile'

    following?.syncFollows followIds.get()

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
        else options.failure()

      failure: options.failure
    )

  getProfileCoverImage: (options = {})->
    @profile.fetch(
      success: (profile) ->
        imageUrl = profile.coverImage()?.imageUrl('wide')
        if imageUrl and not /missing_image.png/.test(imageUrl)
          options.success(imageUrl)
        else options.failure()

      failure: options.failure
    )

  setImage: (imageUrl, failure) =>
    @$image.css backgroundImage: "url(#{imageUrl})"

  setInitials: =>
    @$image.attr 'data-initials', @profile.defaultIconInitials()
    @$image.addClass('is-missing')

  getImage: ->
    console.log 'getImage'
    @getFeaturedShowImage(
      success: @setImage,
      failure: =>
        @getProfileCoverImage(
          success: @setImage
          failure: @setInitials
      )
    )

  fetchMetadata: ->
    @getLocation()
    @getImage()

