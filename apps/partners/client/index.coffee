_                   = require 'underscore'
sd                  = require('sharify').data
Backbone            = require 'backbone'
CurrentUser         = require '../../../models/current_user.coffee'
FollowProfileButton = require './follow_profiles_button.coffee'
FollowProfiles      = require '../../../collections/follow_profiles.coffee'
Profiles            = require '../../../collections/profiles.coffee'

module.exports.FeaturedPartnersView = class FeaturedPartnersView extends Backbone.View

  initialize: (options) ->
    @followProfiles = if CurrentUser.orNull() then new FollowProfiles [] else null
    @initFollowButtons()
    @followProfiles?.syncFollows @collection.pluck('id')

  initFollowButtons: ->
    @followButtons = []
    @collection.each (profile) =>
      @followButtons.push new FollowProfileButton
        el: @$(".featured-partner-profile[data-profile-id='#{profile.get('id')}'] .follow-button")
        collection: @followProfiles
        model: profile

module.exports.init = ->
  new FeaturedPartnersView
    collection: new Profiles sd.PROFILES
    el: $('#featured-partners')
