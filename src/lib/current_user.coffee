#
# The result of merging the current user models from the old Force and
# Microgravity projects. Because this model wraps the session, which is now
# shared, we need to be careful to co-locate the code and not let methods of
# one override the other.
#
_ = require 'underscore'
Backbone = require 'backbone'
request = require 'superagent'
ABM = require '@artsy/backbone-mixins'
{ API_URL, CURRENT_USER } = sd = require('sharify').data
Following = require '../desktop/components/follow_button/collection.coffee'
{ Artists } = require '../desktop/collections/artists'
{ Genes } = require '../desktop/collections/genes'
{ Artworks } = require '../desktop/collections/artworks'
{ Genes } = require '../desktop/collections/genes'
User = require '../desktop/models/user.coffee'
ArtworkCollection = require '../desktop/models/artwork_collection.coffee'
Location = require '../mobile/models/location.coffee'

module.exports = class CurrentUser extends Backbone.Model
  _.extend @prototype, User.prototype
  _.extend @prototype, ABM.CurrentUser(sd.API_URL)

  __isLoggedIn__: true
  __isRecentlyRegistered__: false

  defaults:
    followArtists: null
    followGenes: null

  url: ->
    "#{sd.API_URL}/api/v1/me"

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

  hasLabFeature: (featureName) ->
    _.contains @get('lab_features'), featureName

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

  fetchRegistrations: (options) ->
    new Backbone.Collection().fetch _.extend {}, options,
      url: "#{sd.API_URL}/api/v1/me/bidders"
      data: access_token: @get('accessToken')
      complete: options.complete
      success: _.wrap options.success, (success, collection) ->
        success collection

  checkRegisteredForAuction: (options) ->
    new Backbone.Collection().fetch _.extend {}, options,
      url: "#{sd.API_URL}/api/v1/me/bidders"
      data: sale_id: options.saleId, access_token: @get('accessToken')
      complete: options.complete
      success: _.wrap options.success, (success, collection) ->
        success collection.length > 0

  fetchNotificationBundles: (options) ->
    new Backbone.Model().fetch
      url: "#{@url()}/notifications/feed"
      success: options?.success
      data:
        size: 10
        access_token: @get('accessToken')

  hasUnviewedNotifications: (options) ->
    new Promise((resolve) =>
      request.
        head("#{@url()}/notifications").
        query(
          type: 'ArtworkPublished'
          after_status: 'viewed'
          size: 0
          total_count: 1
          access_token: @get('accessToken')
        ).
        end (err, res) ->
          resolve res.header['x-total-count'] > 0
    )

  fetchAndMarkNotifications: (status = 'read', options) ->
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
        @markNotifications 'read', options

  findOrCreate: (options = {}) ->
    Promise.resolve(@fetch options)

  isLinkedTo: (provider) ->
    @related().authentications.where(provider: provider).length > 0

  isChecked: (attribute) ->
    if (_.isBoolean(@get attribute) and @get(attribute)) then true else undefined

  location: ->
    new Location @get 'location' if @get 'location'

  # Creates a bid position using /api/v1/me/bidder_position.
  #
  # @param {Object} params Query params sent to API
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch

  placeBid: (params, options = {}) ->
    new Backbone.Model(params,).save null, _.extend options,
      url: "#{API_URL}/api/v1/me/bidder_position" +
        if @get('accessToken') then '?access_token=' + @get('accessToken') else ''

  # Checks whether a user registered for an auction.
  #
  # @param {String} auctionId
  # @param {Object} options Provide `success` and `error` callbacks, successes with true or false

  registeredForAuction: (auctionId, options = {}) ->
    new Backbone.Collection().fetch
      url: "#{API_URL}/api/v1/me/bidders"
      data: access_token: @get('accessToken'), sale_id: auctionId
      success: (bidders) ->
        options.success?(bidders?.length > 0)
      error: (m, xhr) ->
        options.success(false) if xhr.responseText?.match 'A user is required'
        options.error? arguments...

  # Checks whether a user has favorited an artwork.
  #
  # @param {String} artworkId
  # @param {Object} options Provide `success` and `error` callbacks, successes with true or false
  savedArtwork: (artworkId, options = {}) =>
    new Backbone.Collection().fetch
      url: "#{API_URL}/api/v1/collection/saved-artwork/artworks?artworks[]=#{artworkId}&private=true&user_id=#{@get 'id'}"
      success: (artworks) ->
        options.success? artworks.length > 0
      error: (m, xhr) ->
        if xhr.responseText?.match 'Collection not found'
          options.success(false)
        else
          options.error? arguments...

  # Unfollows the artist
  #
  # @params {String} artistId
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  unfollowArtist: (artistId, options = {}) =>
    artist = new Backbone.Model()
    artist.isNew = -> false
    artist.destroy _.extend options,
      url: "#{API_URL}/api/v1/me/follow/artist/#{artistId}"

  fetchQualifiedBidder: (auctionId, options) ->
    new Backbone.Collection().fetch
      url: "#{@url()}/bidders"
      data: access_token: @get('accessToken'), sale_id: auctionId
      error: options.error
      success: (bidders) ->
        bidder = bidders.find (b) -> b.get('sale').id is auctionId
        return options.success false unless bidder
        options.success?(bidder?.get('qualified_for_bidding'))

  # Creates a bidder associated with a sale
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch and a saleId
  createBidder: (options) ->
    # For articles and puts, add access_token to model attributes, for gets it goes in the data
    model = new Backbone.Model(sale_id: options.saleId, access_token: @get('accessToken'))
    model.save null,
      url: "#{API_URL}/api/v1/bidder"
      success: options?.success
      error: options?.error

  fetchBidderForAuction: (auction, options) ->
    new Backbone.Collection().fetch
      url: "#{@url()}/bidders"
      data:
        access_token: @get('accessToken')
        sale_id: auction.get('id')
      error: options.error
      success: (bidders) =>
        bidder = bidders.find (b) -> b.get('sale').id is auction.get('id')
        return options.success null unless bidder
        bidder.fetch
          url: "#{sd.API_URL}/api/v1/bidder/#{bidder.id}"
          data:
            access_token: @get('accessToken')
          error: options.error
          success: options.success

  fetchCreditCards: (options) ->
    new Backbone.Collection().fetch
      url: "#{@url()}/credit_cards"
      data:
        access_token: @get('accessToken')
      success: options?.success

  followArtist: (id, options) ->
    new Following(null, kind: 'artist').follow id, _.extend options,
      access_token: @get 'accessToken'

  # Retreive a list of artists the user is following
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  followingArtists: (options) ->
    url = "#{@url()}/follow/artists"
    data = access_token: @get('accessToken')
    @set followArtists: new Artists()
    @get('followArtists').fetchUntilEndInParallel(_.extend { url: url, data: data }, options)

  # TODO: not sure what 'is_slumming' indicates
  isAdmin: ->
    (@get('type') is 'Admin') and ! @get('is_slumming')

  isTeam: ->
    @get('roles').includes('team')

  markNotifications: (status = 'read', options) ->
    request.put("#{@url()}/notifications")
      .set('X-ACCESS-TOKEN': @get 'accessToken')
      .send(status: status)
      .end (err, res) -> options?.success?()

  # Saves the artwork to the user's saved-artwork collection. API creates colletion if user's first save.
  saveArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().saveArtwork(artworkId, options)

  # Removes the artwork from the user's saved-artwork collection.
  removeArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().unsaveArtwork(artworkId, options)

  # Convenience for getting the bootstrapped user or returning null.
  # This should only be used on the client.
  @orNull: ->
    if sd.CURRENT_USER then new @(sd.CURRENT_USER) else null

  # Follow an entity
  follow: (id, kind, options) ->
    new Following(null, kind: kind).follow id, _.extend options,
      access_token: @get 'accessToken'
