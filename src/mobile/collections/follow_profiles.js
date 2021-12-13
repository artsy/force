/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FollowProfiles
const _ = require("underscore")
const sd = require("sharify").data
const { Follows } = require("./follows")
const { FollowProfile } = require("../models/follow_profile")

//
// FollowProfiles
// Maintains the entities followed by the current user and offers `syncFollows` to retrieve
//
export default _FollowProfiles = (function () {
  _FollowProfiles = class FollowProfiles extends Follows {
    static initClass() {
      this.prototype.url = `${sd.API_URL}/api/v1/me/follow/profiles`

      this.prototype.model = FollowProfile

      this.prototype.type = "profile"
    }

    formatIds(entityIds) {
      return { profiles: _.first(entityIds, this.maxSyncSize) }
    }

    followEntity(profileId, options) {
      const follow = new FollowProfile()
      follow.save({ profile_id: profileId }, options)
      follow.set({ profile: { id: profileId } })
      return follow
    }
  }
  _FollowProfiles.initClass()
  return _FollowProfiles
})()
export const FollowProfiles = _FollowProfiles
