_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
CurrentUser   = require '../models/current_user.coffee'
FollowProfile = require '../models/follow_profile.coffee'

#
# FollowProfiles
# Maintains the profiles followed by the current user and offers `syncFollows`
# to retrieve
module.exports = class FollowProfiles extends Backbone.Collection

  url: "#{sd.ARTSY_URL}/api/v1/me/follow/profiles"

  model: FollowProfile

  initialize: ->
    @on 'add', (model) =>
      @trigger "add:#{model.get('profile').id}"
    @on 'remove', (model) =>
      @trigger "remove:#{model.get('profile').id}"

  isFollowing: (profile) ->
    return !_.isUndefined @findByProfileId(profile.get('id'))

  findByProfileId: (profileId) ->
    @find (model) -> model.get('profile').id is profileId

  # Call this from views after one or more profiles are fetched
  # to see if they are followed by the current user
  syncFollows: (profileIds) ->
    return unless CurrentUser.orNull()
    return if profileIds.length is 0
    options =
      data  : { profiles: profileIds }
      cache : false
      remove: false
      merge : true
    @fetch options

  follow: (profileId, options) ->
    throw 'You must pass a success callback' unless options?.success? and _.isFunction options.success
    followProfile = new FollowProfile()
    success = options.success
    options.success = (model, response, options) =>
      @add model
      success arguments
    followProfile.save { profile_id: profileId }, options

  unfollow: (profileId, options) ->
    throw 'You must pass a success callback' unless options?.success? and _.isFunction options.success
    followProfile =  @find (model) -> model.get('profile').id is profileId
    success = options.success
    options.success = (model, repsponse, options) =>
      @remove model
      success arguments
    followProfile.destroy options
