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

  render: =>
    @$el.html template partner:@model, imageUrl:@model.get('imageUrl')

  attachFollowing: ->
    new FollowButton
      following: @following
      modelName: 'profile'
      model: @profile
      el: @$('.partner-cell-follow-button')

  setImage: (imageUrl) =>
    if imageUrl and not /missing_image.png/.test(imageUrl)
      @model.set('imageUrl', imageUrl)
      return true
    else
      return false

  getProfile: ->
    @profile.fetch success: (profile) =>
      imageUrl = profile.coverImage()?.imageUrl('wide')
      if !@setImage(imageUrl)
        @render()

  getShows: ->
    @model.related().shows.fetch(
      success: (shows) =>
        featuredImage = shows.featured()?.posterImageUrl()

        if !@setImage(featuredImage) && shows.length > 0
          firstImage = _.reduceRight(shows.models, (a, b) ->
            return b.posterImageUrl() || a
          , null)

          if !@setImage(firstImage)
            @getProfile()

      , error: @getProfile)

  fetchMetadata: ->
    @model.related().locations.fetch()
    @getShows()

