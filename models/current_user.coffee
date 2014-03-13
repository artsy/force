_                 = require 'underscore'
Backbone          = require 'backbone'
ArtworkCollection = require './artwork_collection.coffee'
Post              = require '../models/post.coffee'
Genes             = require '../collections/genes.coffee'
Artists           = require '../collections/artists.coffee'
Artworks          = require '../collections/artworks.coffee'
{ ARTSY_URL, CURRENT_USER, SESSION_ID } = require('sharify').data
Order = require './order.coffee'
Genes = require '../collections/genes.coffee'
{ readCookie } = require '../components/util/cookie.coffee'

module.exports = class CurrentUser extends Backbone.Model

  url: -> "#{ARTSY_URL}/api/v1/me"

  defaults:
    followArtists       : null
    followGenes         : null

  href: -> "/#{@get('default_profile_id')}"

  # Should only be run after the user has been fetched and has an id
  initializeDefaultArtworkCollection: (options) ->
    unless @get('artworkCollections')?.length > 0
      @set artworkCollections: [new ArtworkCollection(userId: @get('id'))]
    @defaultArtworkCollection().fetch(options) unless @defaultArtworkCollection.fetched

  defaultArtworkCollection: ->
    unless @get('artworkCollections')?[0]?
      throw Error "Must call CurrentUser#initializeDefaultArtworkCollection " +
            "before accessing the default artwork collection."
      return
    @get('artworkCollections')[0]

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

  addToPendingOrder: (options) =>
    model = new Backbone.Model
      edition_set_id : options.editionSetId
      artwork_id     : options.artworkId
      replace_order  : true
      quantity       : options.quantity

    model.save null,
      success: options.success
      error  : options.error
      url    : "#{@url()}/order/pending/items"

  isAdmin: ->
    (@get('type') is 'Admin') and ! @get('is_slumming')

  hasLabFeature: (featureName) ->
    _.contains @get('lab_features'), featureName

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

  unpublishedPost: (options) ->
    if (postId = readCookie("current_post"))
      options.success(new Post(id: postId))
    else
      posts = new Backbone.Collection
      posts.fetch
        url: "#{ARTSY_URL}/api/v1/profile/#{@get('default_profile_id')}/posts/unpublished"
        success: (response) ->
          post = response.models?[0]?.get('results')?[0]
          if post
            options.success(new Post(post))
          else
            options.error
        error: options.error

  fetchSuggestedHomepageArtworks: (options = {}) ->
    new Artworks().fetch _.extend options,
      url: "#{ARTSY_URL}/api/v1/me/suggested/artworks/homepage"

  # Convenience for getting the bootstrapped user or returning null.
  # This should only be used on the client.
  @orNull: ->
    if CURRENT_USER then new @(CURRENT_USER) else null
