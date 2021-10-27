/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let FollowArtists
const _ = require("underscore")
const sd = require("sharify").data
const Follows = require("./follows")
const FollowArtist = require("../models/follow_artist")

//
// FollowArtists
// Maintains the entities followed by the current user and offers `syncFollows` to retrieve
//
module.exports = FollowArtists = (function () {
  FollowArtists = class FollowArtists extends Follows {
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
  FollowArtists.initClass()
  return FollowArtists
})()
