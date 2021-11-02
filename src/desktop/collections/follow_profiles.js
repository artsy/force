/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FollowProfiles
const _ = require("underscore")
const sd = require("sharify").data
const Backbone = require("backbone")
const CurrentUser = require("../models/current_user")
const FollowProfile = require("../models/follow_profile")

//
// FollowProfiles
// Maintains the profiles followed by the current user and offers `syncFollows`
// to retrieve
export default _FollowProfiles = (function () {
  _FollowProfiles = class FollowProfiles extends Backbone.Collection {
    static initClass() {
      this.prototype.maxSyncSize = 10

      this.prototype.url = `${sd.API_URL}/api/v1/me/follow/profiles`

      this.prototype.model = FollowProfile
    }

    initialize() {
      this.on("add", model => {
        return this.trigger(`add:${model.get("profile").id}`)
      })
      return this.on("remove", model => {
        return this.trigger(`remove:${model.get("profile").id}`)
      })
    }

    isFollowing(profile) {
      return !_.isUndefined(this.findByProfileId(profile.get("id")))
    }

    findByProfileId(profileId) {
      return this.find(model => model.get("profile").id === profileId)
    }

    // Call this from views after one or more profiles are fetched
    // to see if they are followed by the current user
    // Recursively chunks the list of ids by @maxSyncSize
    syncFollows(profileIds) {
      if (!CurrentUser.orNull()) {
        return
      }
      if (profileIds.length === 0) {
        return
      }
      // Fetch the first up to @maxSyncSize
      const options = {
        data: { profiles: _.first(profileIds, this.maxSyncSize) },
        cache: false,
        remove: false,
        merge: true,
      }
      this.fetch(options)
      // Recursively fetch the rest
      return this.syncFollows(_.rest(profileIds, this.maxSyncSize))
    }

    follow(profileId, options) {
      if (options == null) {
        options = {}
      }
      window.analytics.track("Followed profile", { message: "Follow profile" })

      const { error } = options
      options.error = function (model, response, options) {
        this.remove(model)
        if (error) {
          return error(arguments)
        }
      }.bind(this)

      const followProfile = new FollowProfile()
      followProfile.save({ profile_id: profileId }, options)
      followProfile.set({ profile: { id: profileId } })
      return this.add(followProfile)
    }

    unfollow(profileId, options) {
      if (options == null) {
        options = {}
      }
      window.analytics.track("Unfollowed profile", {
        message: "Unfollow profile",
      })

      const { error } = options
      options.error = function (model, response, options) {
        this.add(model)
        if (error) {
          return error(arguments)
        }
      }.bind(this)

      const followProfile = this.find(
        model => model.get("profile").id === profileId
      )
      if (followProfile != null) {
        followProfile.destroy(options)
      }
      return this.remove(followProfile)
    }
  }
  _FollowProfiles.initClass()
  return _FollowProfiles
})()
export const FollowProfiles = _FollowProfiles
