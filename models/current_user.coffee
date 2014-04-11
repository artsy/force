_ = require 'underscore'
Backbone = require 'backbone'
ArtworkCollection = require './artwork_collection.coffee'
Location          = require './location.coffee'
Post              = require './post.coffee'
Genes             = require '../collections/genes.coffee'
Artists           = require '../collections/artists.coffee'
Artworks          = require '../collections/artworks.coffee'
sd                = require('sharify').data
Order             = require './order.coffee'
Genes             = require '../collections/genes.coffee'
{ readCookie }    = require '../components/util/cookie.coffee'
Following         = require '../components/follow_button/collection.coffee'
geoLocate         = require '../components/util/geolocate.coffee'

module.exports = class CurrentUser extends Backbone.Model

  url: -> "#{sd.ARTSY_URL}/api/v1/me"

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
    if method in ['create', 'update', 'patch']
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
    data =
      edition_set_id : options.editionSetId
      artwork_id     : options.artworkId
      replace_order  : true
      quantity       : options.quantity
    unless @get('accessToken')
      data.session_id = sd.SESSION_ID

    model = new Backbone.Model data
    model.save null,
      url    : "#{@url()}/order/pending/items"
      success: options.success
      error  : options.error

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
        url: "#{sd.ARTSY_URL}/api/v1/profile/#{@get('default_profile_id')}/posts/unpublished"
        success: (response) ->
          post = response.models?[0]?.get('results')?[0]
          if post
            options.success(new Post(post))
          else
            options.error
        error: options.error

  fetchSuggestedHomepageArtworks: (options = {}) ->
    new Artworks().fetch _.extend options,
      url: "#{sd.ARTSY_URL}/api/v1/me/suggested/artworks/homepage"

  followArtist: (id, options) ->
    new Following(null, kind: 'artist').follow id, _.extend options,
      access_token: @get 'accessToken'

  # Convenience for getting the bootstrapped user or returning null.
  # This should only be used on the client.
  @orNull: ->
    if sd.CURRENT_USER then new @(sd.CURRENT_USER) else null

  location: ->
    new Location @get 'location' if @get 'location'

  fetchCreditCards: (options) ->
    new Backbone.Collection().fetch
      url: "#{@url()}/credit_cards"
      data:
        access_token: @get('accessToken')
      success: options?.success

  checkRegisteredForAuction: (options) ->
    new Backbone.Collection().fetch
      url: "#{sd.ARTSY_URL}/api/v1/me/bidders"
      data:
        access_token: @get('accessToken')
        sale_id: options.saleId
      success: (response) ->
        options?.success response.length > 0
      error: options?.error

  createBidder: (options) ->
    # For posts and puts, add access_token to model attributes, for gets it goes in the data
    model = new Backbone.Model(sale_id: options.saleId, access_token: @get('accessToken'))
    model.save null,
      url: "#{sd.ARTSY_URL}/api/v1/bidder"
      success: options?.success
      error: options?.error

  geoLocate: (options) ->
    geoLocate.locate options

  setGeo: (geo) ->
    @set location:
      city        : geo.getCity() or ''
      state       : geo.getState() or ''
      state_code  : geo.getStateCode() or ''
      postal_code : geo.getPostalCode() or ''
      coordinates : geo.getCoordinates() or null
      country     : geo.getCountry() or ''
