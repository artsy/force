Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data

module.exports = class CurrentUser extends Backbone.Model

  url: -> "#{sd.GRAVITY_URL}/api/v1/me"

  # Add the access token to fetches and saves
  sync: (method, model, options = {}) ->
    options.data ?= {}
    options.data.access_token = @get 'accessToken'
    super

  # Checks whether a user has favorited an artwork.
  #
  # @param {String} artworkId
  # @param {Object} options Provide `success` and `error` callbacks, successes with true or false
  savedArtwork: (artworkId, options) =>
    new Backbone.Collection(null,
      url: "#{sd.GRAVITY_URL}/api/v1/collection/saved-artwork/artworks?artworks[]=#{artworkId}&private=false&user_id=#{@get 'id'}"
    ).fetch
      success: (artworks) ->
        options.success? artworks.length > 0
      error: (m, xhr) ->
        if xhr.responseText?.match 'Collection not found'
          options.success(false)
        else
          options.error? arguments...

  # Saves the artwork to the user's saved-artwork collection. API creates colletion if user's first save.
  #
  # @param {String} artworkId
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  saveArtwork: (artworkId, options = {}) =>
    new Backbone.Model().save null, _.extend options,
      url: "#{sd.GRAVITY_URL}/api/v1/collection/saved-artwork/artwork/#{artworkId}?user_id=#{@get('id')}"
      data: { access_token: @get('accessToken') }

  # Removes the artwork from the user's saved-artwork collection.
  #
  # @params{String} artworkId
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  removeArtwork: (artworkId, options = {}) =>
    artwork = new Backbone.Model()
    artwork.isNew = -> false
    artwork.destroy _.extend options,
      url: "#{sd.GRAVITY_URL}/api/v1/collection/saved-artwork/artwork/#{artworkId}?user_id=#{@get('id')}"
      data: { access_token: @get('accessToken') }

  # Retreive a list of artists the user is following
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  followingArtists: (options) ->
    new Backbone.Collection(null
      url: "#{sd.GRAVITY_URL}/api/v1/me/follow/artists"
    ).fetch options

  # Follows the artist
  #
  # @params {String} artistId
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  followArtist: (artistId, options) =>
    new Backbone.Model(null,
      url: "#{sd.GRAVITY_URL}/api/v1/me/follow/artist"
    ).save { artist_id: artistId }, options
