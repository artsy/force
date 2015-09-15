{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
Backbone = require 'backbone'
{ CURRENT_USER } = require('sharify').data
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
Q = require 'bluebird-q'

module.exports = class PartnerCell extends Backbone.View
  initialize: ({ @partner, @$el }) ->
    @profile = new Profile id: @partner.get('default_profile_id')

    @fetchMetadata()

    following = new Following([], kind: 'profile') if CURRENT_USER?

    new FollowButton
      el: $('.partner-cell-follow-button')
      following: following
      model: @profile
      modelName: 'profile'

    following?.syncFollows followIds.get()

  fetchMetadata: ->
    Q.all([
      @partner.related().locations.fetch()
      @partner.related().shows.fetch()
    ]).then =>
      featuredShow = @partner.related().shows.featured()
      if featuredShow
        @$('.hoverable-image').css backgroundImage: "url(#{featuredShow.posterImageUrl()})"

      @$('.partner-cell-location').text @partner.displayLocations()