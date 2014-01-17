sd       = require('sharify').data
Backbone = require 'backbone'
Artist   = require './artist.coffee'

#
# A convenient model that represents a followable artist by the current user.
#
# The model must implement `getFollowParams` and `getItem` methods.
module.exports = class FollowArtist extends Backbone.Model

  urlRoot: ->
    "#{sd.ARTSY_URL}/api/v1/me/follow/artist"

  # Store (and cache) an actual Artist instance
  item: null

  # Returns the api params to be used for following the artist
  getFollowParams: (artistId) ->
    return artist_id: artistId

  #
  # Returns the underlying instance of Artist model
  #
  # Since this is a convenient model for following, sometimes we might 
  # need the actual model, for example, in order to use its methods.
  # Instead of extending the actual model and inheriting lots of unnecessary
  # stuff in the prototype (or mistakenly calling methods of the actual model
  # with wrong model url), we lazily create/cache an instance of the model.
  getItem: ->
    @item = new Artist @get 'artist' unless @item?
    @item
