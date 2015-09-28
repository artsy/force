Backbone = require 'backbone'
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
Q = require 'bluebird-q'
{ FollowButton } = require '../../../../components/follow_button/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class PartnerCell extends Backbone.View
  initialize: ({ @following }) ->
    @profile = @model.related().profile 
    @listenTo @model.related().locations, 'sync', @render
    @listenTo @model, 'change:imageUrl', @render

  render: ->
    @$el.html template @model, @imageUrl

  attachFollowing: ->
    new FollowButton
      following: @following
      modelName: 'profile'
      model: @profile
      el: @$('.partner-cell-follow-button')
    
  getLocation: ->
    @partner.related().locations.fetch

  setImage: (imageUrl) =>
    if imageUrl and not /missing_image.png/.test(imageUrl)
      @imageUrl = imageUrl
      @$image.removeClass 'is-missing'
      return true
    else
      return false

  getImage: ->

    getProfileCoverImage = =>
      @profile.fetch success: (profile) ->
      imageUrl = profile.coverImage()?.imageUrl('wide')
      @setImage(imageUrl)


    @partner.related().shows.fetch(
      success: (shows) ->
        featuredImage = shows.featured()?.posterImageUrl() 

        if !@setImage(featuredImage)
          firstImage = _.reduceRight(shows, (a, b) ->
            return b.posterImageUrl() || a
          , null)

          if !@setImage(firstImage)
            getProfileCoverImage()

      , error: getProfileCoverImage)

  fetchMetadata: ->
    @getLocation()
    @getImage()

