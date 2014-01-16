_             = require 'underscore'
sd            = require('sharify').data
FollowItems   = require './follow_items.coffee'
FollowArtist  = require '../models/follow_artist.coffee'

#
# FollowArtists
#
# Collection that maintains the artists followed by the current user
# This collection must implement `getSyncFollowsData` method
module.exports = class FollowArtists extends FollowItems

  url: "#{sd.ARTSY_URL}/api/v1/me/follow/artists"

  model: FollowArtist

  # Returns the `data` to be used in the options when
  # fetching following artists with `syncFollows`.
  getSyncFollowsData: (artistsIds) ->
    return artists: artistsIds
