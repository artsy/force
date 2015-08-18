Q = require 'q'
_ = require 'underscore'
Backbone = require 'backbone'
request = require 'superagent'
ArtworkCollection = require './artwork_collection.coffee'
Genes = require '../collections/genes.coffee'
Artists = require '../collections/artists.coffee'
Artworks = require '../collections/artworks.coffee'
sd = require('sharify').data
analytics = require '../lib/analytics.coffee'
Order = require './order.coffee'
Genes = require '../collections/genes.coffee'
Following = require '../components/follow_button/collection.coffee'
ABM = require 'artsy-backbone-mixins'
mediator = require '../lib/mediator.coffee'
User = require './user.coffee'

module.exports = class CurrentUser extends User
  _.extend @prototype, ABM.CurrentUser(sd.API_URL)

  __isLoggedIn__: true

  url: ->
    "#{sd.API_URL}/api/v1/me"

  defaults:
    followArtists: null
    followGenes: null

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

  # Saves the artwork to the user's saved-artwork collection. API creates colletion if user's first save.
  saveArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().saveArtwork(artworkId, options)

  # Removes the artwork from the user's saved-artwork collection.
  removeArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().unsaveArtwork(artworkId, options)

  addToPendingOrder: (options) =>
    data =
      edition_set_id: options.editionSetId
      artwork_id: options.artworkId
      replace_order: true
      quantity: options.quantity
    unless @get('accessToken')
      data.session_id = sd.SESSION_ID

    model = new Backbone.Model data
    model.save null,
      url: "#{@url()}/order/pending/items"
      success: options.success
      error: options.error

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
    @get('followArtists').fetchUntilEndInParallel(_.extend { url: url, data: data }, options)

  # Retreive a list of genes the user is following
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  followingGenes: (options) ->
    url = "#{@url()}/follow/genes"
    data = access_token: @get('accessToken')
    @set followGenes: new Genes()
    @get('followGenes').fetchUntilEnd(_.extend { url: url, data: data }, options)

  fetchSuggestedHomepageArtworks: (options = {}) ->
    new Artworks().fetch _.extend options,
      url: "#{sd.API_URL}/api/v1/me/suggested/artworks/homepage"

  followArtist: (id, options) ->
    new Following(null, kind: 'artist').follow id, _.extend options,
      access_token: @get 'accessToken'

  # Convenience for getting the bootstrapped user or returning null.
  # This should only be used on the client.
  @orNull: ->
    if sd.CURRENT_USER then new @(sd.CURRENT_USER) else null

  fetchCreditCards: (options) ->
    new Backbone.Collection().fetch
      url: "#{@url()}/credit_cards"
      data:
        access_token: @get('accessToken')
      success: options?.success

  checkRegisteredForAuction: (options) ->
    new Backbone.Collection().fetch _.extend {}, options,
      url: "#{sd.API_URL}/api/v1/me/bidders"
      data: sale_id: options.saleId, access_token: @get('accessToken')
      success: _.wrap options.success, (success, collection) ->
        success collection.length > 0

  createBidder: (options) ->
    # For posts and puts, add access_token to model attributes, for gets it goes in the data
    model = new Backbone.Model(sale_id: options.saleId, access_token: @get('accessToken'))
    model.save null,
      url: "#{sd.API_URL}/api/v1/bidder"
      success: options?.success
      error: options?.error

  isEditorialAdmin: ->
    return false unless sd.EDITORIAL_ADMINS?
    @get('type') is 'Admin' and
    @get('email')?.split('@')[0] in sd.EDITORIAL_ADMINS?.split(',')

  fetchNotificationBundles: (options) ->
    new Backbone.Model().fetch
      url: "#{@url()}/notifications/feed"
      data:
        size: 50
        access_token: @get('accessToken')
      success: options?.success

  fetchAndMarkNotifications: (options) ->
    url = "#{@url()}/notifications"
    @set unreadNotifications: new Backbone.Collection()
    @get('unreadNotifications').fetch
      url: url
      data:
        type: 'ArtworkPublished'
        unread: true
        size: 100
        access_token: @get('accessToken')
      success: =>
        request.put(url)
          .send({status: 'read', access_token: @get('accessToken')})
          .end (err, res) -> options?.success

  findOrCreate: (options = {}) ->
    Q(@fetch options)
