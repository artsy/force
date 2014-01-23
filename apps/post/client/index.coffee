_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
Post                    = require '../../../models/post.coffee'
Profile                 = require '../../../models/profile.coffee'
CurrentUser             = require '../../../models/current_user.coffee'
FollowProfileButton     = require '../../partners/client/follow_profiles_button.coffee'
FollowProfiles          = require '../../../collections/follow_profiles.coffee'

module.exports.PostView = class PostView extends Backbone.View

  initialize: (options) ->
    @followProfiles = if CurrentUser.orNull() then new FollowProfiles [] else null
    @initFollowButton options.profile
    @followProfiles?.syncFollows [options.profile.get('id')]

  initFollowButton: (profile) ->
    new FollowProfileButton
      el: @$(".profile-header .follow-button")
      collection: @followProfiles
      model: profile

module.exports.init = ->
  new PostView
    profile: new Profile sd.PROFILE
    model  : new Post sd.POST
    el     : $('#post')
