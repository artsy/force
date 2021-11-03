/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FollowArtists
const _ = require("underscore")
const sd = require("sharify").data
const { Follows } = require("./follows")
const { FollowArtist } = require("../models/follow_artist")

//
// FollowArtists
// Maintains the entities followed by the current user and offers `syncFollows` to retrieve
//
export default _FollowArtists = (function () {
  _FollowArtists = class FollowArtists extends Follows {
    static initClass() {
      this.prototype.url = `${sd.API_URL}/api/v1/me/follow/artists`

      this.prototype.model = FollowArtist

      this.prototype.type = "artist"
    }

    formatIds(entityIds) {
      return { artists: _.first(entityIds, this.maxSyncSize) }
    }

    followEntity(artistId, options) {
      const follow = new FollowArtist()
      follow.save({ artist_id: artistId }, options)
      follow.set({ artist: { id: artistId } })
      return follow
    }
  }
  _FollowArtists.initClass()
  return _FollowArtists
})()
export const FollowArtists = _FollowArtists
