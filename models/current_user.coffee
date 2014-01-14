_                 = require 'underscore'
Backbone          = require 'backbone'
Order             = require './order.coffee'
ArtworkCollection = require './artwork_collection.coffee'
{ ARTSY_URL, CURRENT_USER, SESSION_ID } = require('sharify').data

module.exports = class CurrentUser extends Backbone.Model

  url: -> "#{ARTSY_URL}/api/v1/me"

  # Should only be run after the user has been fetched and has an id
  initializeDefaultArtworkCollection: (options) ->
    unless @get('artworkCollections')?.length > 0
      @set artworkCollections: [new ArtworkCollection(userId: @get('id'))]
    @defaultArtworkCollection().fetch(options) unless @defaultArtworkCollection.fetched

  defaultArtworkCollection: -> @get('artworkCollections')[0]

  # Add the access token to fetches and saves
  sync: (method, model, options = {}) ->
    options.data ?= if method in ['create', 'update'] then _.omit(@toJSON(), 'accessToken') else {}
    options.data.access_token = @get 'accessToken'
    super

  # Saves the artwork to the user's saved-artwork collection. API creates colletion if user's first save.
  saveArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().saveArtwork(artworkId, options)

  # Removes the artwork from the user's saved-artwork collection.
  removeArtwork: (artworkId, options = {}) =>
    @defaultArtworkCollection().unsaveArtwork(artworkId, options)

  # Convenience for getting the bootstrapped user or returning null.
  # This should only be used on the client.
  @orNull: ->
    if CURRENT_USER then new @(CURRENT_USER) else null

  formatOrderUrl: (url, session_id) ->
    return url if CURRENT_USER
    "#{url}?session_id=#{session_id}"

  # Methods for the a user's Order
  fetchPendingOrder: (options) ->
    url = @formatOrderUrl "#{@url()}/order/pending", (options.session_id or SESSION_ID)
    new Order().fetch _.extend({ url: url, data: { access_token: @get('accessToken'), session_id: SESSION_ID } }, options)

  updateOrder: (orderId, options) ->
    url = @formatOrderUrl "#{@url()}/order/#{orderId}", (options.session_id or SESSION_ID)
    new Order(id: orderId).save({ access_token: @get('accessToken'), session_id: SESSION_ID }, _.extend({url: url}, options))

  submitOrder: (orderId, options) ->
    url = @formatOrderUrl "#{@url()}/order/#{orderId}/submit", (options.session_id or SESSION_ID)
    new Order(id: orderId).save({ access_token: @get('accessToken'), session_id: SESSION_ID }, _.extend({url: url}, options))

  resumeOrder: (orderId, token, options) ->
    url = @formatOrderUrl "#{@url()}/order/#{orderId}/resume", (options.session_id or SESSION_ID)
    new Order(id: orderId).save({ access_token: @get('accessToken'), token: token, session_id: SESSION_ID }, _.extend({url: url}, options))
