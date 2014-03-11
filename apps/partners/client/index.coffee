_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
Profiles      = require '../../../collections/profiles.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

module.exports.FeaturedPartnersView = class FeaturedPartnersView extends Backbone.View
  initialize: (options) ->
    @following = new Following(null, kind: 'profile') if sd.CURRENT_USER?
    @initFollowButtons()
    @following?.syncFollows @collection.pluck('id')

  initFollowButtons: ->
    @followButtons = @collection.map (profile) =>
      new FollowButton
        analyticsFollowMessage: 'Followed partner profile from /partners'
        analyticsUnfollowMessage: 'Unfollowed partner profile from /partners'
        el: @$(".featured-partner-profile[data-profile-id='#{profile.get('id')}'] .follow-button")
        following: @following
        modelName: 'Partner'
        model: profile

module.exports.init = ->
  new FeaturedPartnersView
    collection: new Profiles sd.PROFILES
    el: $('#featured-partners')
