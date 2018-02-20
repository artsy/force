_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Follows = require './follows.coffee'
FollowArtist = require '../models/follow_artist.coffee'

#
# FollowArtists
# Maintains the entities followed by the current user and offers `syncFollows` to retrieve
#
module.exports = class FollowArtists extends Follows

  url: "#{sd.API_URL}/api/v1/me/follow/artists"

  model: FollowArtist

  type: 'artist'

  formatIds: (entityIds) ->
    artists: _.first entityIds, @maxSyncSize

  followEntity: (artistId, options) ->
    follow = new FollowArtist
    follow.save { artist_id: artistId }, options
    follow.set { artist: { id: artistId } }
    follow
