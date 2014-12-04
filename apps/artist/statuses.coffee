_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
cache = require '../../lib/cache'
{ API_URL } = require('sharify').data

getArtworks = (artist, options = {}) ->
  dfd = Q.defer()
  options = _.defaults options, cache: true

  filterState = new Backbone.Model
  filterState.url = "#{API_URL}/api/v1/search/filtered/artist/#{artist.id}/suggest"
  filterState.fetch
    cache: options.cache
    success: (model, response) ->
      dfd.resolve artworks: !!response?.total
    error: -> dfd.resolve artworks: false

  dfd.promise

getStatus = (artist, name, options = {}) ->
  dfd = Q.defer()
  options = _.defaults options, cache: true, size: 1
  resolve = (status) ->
    dfd.resolve _.tap({}, (x) -> x[name] = status)

  artist.related()[name].fetch
    data: size: options.size
    cache: options.cache
    success: (collection) ->
      resolve !!collection.length
    error: -> resolve false

  dfd.promise

module.exports = (artist, options = {}) ->
  dfd = Q.defer()

  cacheKey = "artist:#{artist.id}:statuses"
  cache.getHash cacheKey, {}, (err, cachedData) ->
    return dfd.resolve(cachedData) if cachedData and options.cache

    get = _.partial getStatus, artist

    Q.allSettled([
      getArtworks artist
      get 'shows', size: 2 # Remove once Gravity is deployed
      get 'posts'
      get 'artists'
      get 'contemporary'
      get 'articles'
      get 'merchandisable'
      get 'bibliography'
      get 'collections'
      get 'exhibitions'
    ]).then((states) ->

      statuses = _.extend {}, _.pluck(states, 'value')...
      dfd.resolve statuses
      cache.setHash cacheKey, statuses

    ).done()

  dfd.promise
