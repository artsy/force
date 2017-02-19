_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL, CURRENT_USER, SESSION_ID, EDITORIAL_ADMINS } = require('sharify').data
SaleArtwork = require './sale_artwork.coffee'
Location = require './location.coffee'
request = require 'superagent'

module.exports = class CurrentUser extends Backbone.Model

  url: -> "#{API_URL}/api/v1/me"

  sync: (method, model, options = {}) ->
    if method is 'read'
      options.data ?= {}
      options.data.access_token = @get 'accessToken'
    super

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

  # Saves the artwork to the user's saved-artwork collection. API creates colletion if user's first save.
  #
  # @param {String} artworkId
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  saveArtwork: (artworkId, options = {}) =>
    new Backbone.Model().save null, _.extend options,
      url: "#{API_URL}/api/v1/collection/saved-artwork/artwork/#{artworkId}?user_id=#{@get('id')}"
      data: { access_token: @get('accessToken') }

  # Removes the artwork from the user's saved-artwork collection.
  #
  # @params{String} artworkId
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  removeArtwork: (artworkId, options = {}) =>
    artwork = new Backbone.Model()
    artwork.isNew = -> false
    artwork.destroy _.extend options,
      url: "#{API_URL}/api/v1/collection/saved-artwork/artwork/#{artworkId}?user_id=#{@get('id')}"
      data: { access_token: @get('accessToken') }

  # Retreive a list of artists the user is following
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  followingArtists: (options = {}) ->
    new Backbone.Collection().fetch _.extend options,
      url: "#{API_URL}/api/v1/me/follow/artists"

  # Follows the artist
  #
  # @params {String} artistId
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  followArtist: (artistId, options = {}) =>
    new Backbone.Model().save { artist_id: artistId }, _.extend options,
      url: "#{API_URL}/api/v1/me/follow/artist"

  # Unfollows the artist
  #
  # @params {String} artistId
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  unfollowArtist: (artistId, options = {}) =>
    artist = new Backbone.Model()
    artist.isNew = -> false
    artist.destroy _.extend options,
      url: "#{API_URL}/api/v1/me/follow/artist/#{artistId}"

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

  fetchCreditCards: (options) ->
    new Backbone.Collection().fetch
      url: "#{@url()}/credit_cards"
      data:
        access_token: @get('accessToken')
      success: options?.success

  addToPendingOrder: (options) =>
    data =
      edition_set_id: options.editionSetId
      artwork_id: options.artworkId
      replace_order: true
      quantity: options.quantity
    unless @get('accessToken')
      data.session_id = SESSION_ID

    model = new Backbone.Model data
    model.save null,
      url: "#{@url()}/order/pending/items"
      success: options.success
      error: options.error

  # Convenience for getting the bootstrapped user or returning null.
  # This should only be used on the client.
  @orNull: ->
    if CURRENT_USER then new @(CURRENT_USER) else null

  isAdmin: ->
    @get('type') is 'Admin'

  isEditorialAdmin: ->
    @get('type') is 'Admin' and
    @get('email')?.split('@')[0] in EDITORIAL_ADMINS?.split(',')

  markNotifications: (options) ->
    url = "#{@url()}/notifications"
    request.put(url)
      .set('X-ACCESS-TOKEN': @get('accessToken'))
      .send({status: 'read'})
      .end (err, res) -> options?.success()

  fetchBidderForAuction: (auctionId, options) ->
    new Backbone.Collection().fetch
      url: "#{@url()}/bidders"
      error: options.error
      success: (bidders) ->
        bidder = bidders.find (b) -> b.get('sale').id is auctionId
        return options.success null unless bidder
        bidder.fetch
          url: "#{API_URL}/api/v1/bidder/#{bidder.id}"
          error: options.error
          success: options.success

  fetchQualifiedBidder: (auctionId, options) ->
    new Backbone.Collection().fetch
      url: "#{@url()}/bidders"
      data: access_token: @get('accessToken'), sale_id: auctionId
      error: options.error
      success: (bidders) ->
        bidder = bidders.find (b) -> b.get('sale').id is auctionId
        return options.success false unless bidder
        options.success?(bidder?.get('qualified_for_bidding'))
