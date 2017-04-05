_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Follows = require './follows'
FollowProfile = require '../models/follow_profile'

#
# FollowProfiles
# Maintains the entities followed by the current user and offers `syncFollows` to retrieve
#
module.exports = class FollowProfiles extends Follows

  url: "#{sd.API_URL}/api/v1/me/follow/profiles"

  model: FollowProfile

  type: 'profile'

  formatIds: (entityIds) ->
    profiles: _.first entityIds, @maxSyncSize

  followEntity: (profileId, options) ->
    follow = new FollowProfile
    follow.save { profile_id: profileId }, options
    follow.set { profile: { id: profileId } }
    follow
