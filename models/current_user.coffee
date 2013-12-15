Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
ArtworkCollection = require './artwork_collection.coffee'

module.exports = class CurrentUser extends Backbone.Model

  url: -> "#{sd.GRAVITY_URL}/api/v1/me"

  # Should only be run after the user has been fetched and has an id
  initializeDefaultArtworkCollection: (options) ->
    unless @get('artworkCollections')?.length > 0
      @set artworkCollections: [new ArtworkCollection(userId: @get('id'))]
    @defaultArtworkCollection().fetch(options) unless @defaultArtworkCollection.fetched

  defaultArtworkCollection: -> @get('artworkCollections')[0]

  # Add the access token to fetches and saves
  sync: (method, model, options = {}) ->
    options.data ?= {}
    options.data.access_token = @get 'accessToken'
    super

  # Saves the artwork to the user's saved-artwork collection. API creates colletion if user's first save.
  saveArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().saveArtwork(artworkId, options)

  # Removes the artwork from the user's saved-artwork collection.
  removeArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().saveArtwork(artworkId, options)

  # Retreive a list of artists the user is following
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  followingArtists: (options) ->
    new Backbone.Collection(null
      url: "#{sd.GRAVITY_URL}/api/v1/me/follow/artists"
    ).fetch options

  followArtist: (artistId, options) ->
    $.ajax "#{sd.GRAVITY_URL}/api/v1/me/follow/artist?artist_id=#{artistId}",
      type : "POST",
      success: options?.success
      error: options?.error
    false

  unfollowArtist: (artistId, options) ->
    $.ajax "#{sd.GRAVITY_URL}/api/v1/me/follow/artist?artist_id=#{artistId}",
      type : "DELETE",
      success: options?.success
      error: options?.error
    false

  # Convenience for getting the bootstrapped user or returning null.
  # This should only be used on the client.
  @orNull: ->
    if sd.CURRENT_USER then new @(sd.CURRENT_USER) else null
