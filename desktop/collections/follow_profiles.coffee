_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../models/current_user'
FollowProfile = require '../models/follow_profile'
analyticsHooks = require '../lib/analytics_hooks'

#
# FollowProfiles
# Maintains the profiles followed by the current user and offers `syncFollows`
# to retrieve
module.exports = class FollowProfiles extends Backbone.Collection

  maxSyncSize: 10

  url: "#{sd.API_URL}/api/v1/me/follow/profiles"

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
  # Recursively chunks the list of ids by @maxSyncSize
  syncFollows: (profileIds) ->
    return unless CurrentUser.orNull()
    return if profileIds.length is 0
    # Fetch the first up to @maxSyncSize
    options =
      data: { profiles: _.first(profileIds, @maxSyncSize) }
      cache: false
      remove: false
      merge: true
    @fetch options
    # Recursively fetch the rest
    @syncFollows _.rest(profileIds, @maxSyncSize)

  follow: (profileId, options={}) ->
    analyticsHooks.trigger 'followable:followed', message: "Follow profile"

    error = options.error
    options.error = (model, response, options) =>
      @remove model
      error arguments if error

    followProfile = new FollowProfile
    followProfile.save { profile_id: profileId }, options
    followProfile.set { profile: { id: profileId } }
    @add followProfile

  unfollow: (profileId, options={}) ->
    analyticsHooks.trigger 'followable:unfollowed', message: "Unfollow profile"
    error = options.error
    options.error = (model, response, options) =>
      @add model
      error arguments if error

    followProfile = @find (model) -> model.get('profile').id is profileId
    followProfile?.destroy options
    @remove followProfile
