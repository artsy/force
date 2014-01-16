sd       = require('sharify').data
Backbone = require 'backbone'

#
# A convenient model that represents a followable artist by the current user.
#
# The model must implement `getFollowParams` and `getItem` methods.
module.exports = class FollowArtist extends Backbone.Model

  urlRoot: ->
    "#{sd.ARTSY_URL}/api/v1/me/follow/artist"

  # Returns the api params to be used for following the artist
  getFollowParams: (artistId) ->
    return artist_id: artistId

  # Returns the underlying artist attributes
  getItem: ->
    return @get('artist')
