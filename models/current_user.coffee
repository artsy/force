_                 = require 'underscore'
Backbone          = require 'backbone'
ArtworkCollection = require './artwork_collection.coffee'
Genes             = require '../collections/genes.coffee'
Artists           = require '../collections/artists.coffee'
{ ARTSY_URL, CURRENT_USER, SESSION_ID } = require('sharify').data
Order = require './order.coffee'
Genes = require '../collections/genes.coffee'

module.exports = class CurrentUser extends Backbone.Model

  url: -> "#{ARTSY_URL}/api/v1/me"

  defaults:
    followArtists       : null
    followGenes         : null

  # Should only be run after the user has been fetched and has an id
  initializeDefaultArtworkCollection: (options) ->
    unless @get('artworkCollections')?.length > 0
      @set artworkCollections: [new ArtworkCollection(userId: @get('id'))]
    @defaultArtworkCollection().fetch(options) unless @defaultArtworkCollection.fetched

  defaultArtworkCollection: -> @get('artworkCollections')[0]

  # Add the access token to fetches and saves
  sync: (method, model, options={}) ->
    if method in ['create', 'update']
      # If persisting to the server overwrite attrs
      options.attrs = _.omit(@toJSON(), 'accessToken')
    else
      # Otherwise overwrite data
      _.defaults(options, { data: { access_token: @get('accessToken') } })
    super

  # Saves the artwork to the user's saved-artwork collection. API creates colletion if user's first save.
  saveArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().saveArtwork(artworkId, options)

  # Removes the artwork from the user's saved-artwork collection.
  removeArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().unsaveArtwork(artworkId, options)

  # Retreive a list of artists the user is following
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  followingArtists: (options) ->
    url = "#{@url()}/follow/artists"
    data = access_token: @get('accessToken')
    @set followArtists: new Artists()
    @get('followArtists').fetchUntilEnd(_.extend { url: url, data: data }, options)

  # Retreive a list of genes the user is following
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  followingGenes: (options) ->
    url = "#{@url()}/follow/genes"
    data = access_token: @get('accessToken')
    @set followGenes: new Genes()
    @get('followGenes').fetchUntilEnd(_.extend { url: url, data: data }, options)

  # Convenience for getting the bootstrapped user or returning null.
  # This should only be used on the client.
  @orNull: ->
    if CURRENT_USER then new @(CURRENT_USER) else null
