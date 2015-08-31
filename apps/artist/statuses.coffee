_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
cache = require '../../lib/cache'
{ API_URL } = require('sharify').data

module.exports = class Statuses
  constructor: ({ @artist }) ->
    @statuses = {}

  fetch: ({ @cache } = {}) ->
    dfd = Q.defer()

    cacheKey = "artist:#{@artist.id}:statuses"
    cache.getHash cacheKey, {}, (err, cachedData) =>
      return dfd.resolve(cachedData) if cachedData and @cache

      Q.allSettled([
        @fetchArtworks()
        @fetchStatus 'shows'
        @fetchStatus 'artists'
        @fetchStatus 'contemporary'
        @fetchStatus 'webArticles'
        @fetchStatus 'merchandisable'
        @fetchStatus 'bibliography'
        @fetchStatus 'collections'
        @fetchStatus 'exhibitions'
        @fetchArticles()
      ]).then((states) =>

        @statuses = _.extend {}, _.pluck(states, 'value')...
        dfd.resolve @statuses
        cache.setHash cacheKey, @statuses

      ).done()

    dfd.promise

  fetchArticles: ->
    dfd = Q.defer()

    # Writer uses the `_id` to fetch. Since we only have the slug
    # we can't fetch this in parallel
    @artist.fetch
      cache: @cache
      error: -> dfd.resolve articles: false
      success: =>
        @artist.related().articles.fetch
          cache: @cache
          data: limit: 50
          error: -> dfd.resolve articles: false
          success: (articles, response) ->
            dfd.resolve
              articles: !!response?.count
              biography: articles.biography()?

    dfd.promise

  fetchArtworks: ->
    dfd = Q.defer()

    filterState = new Backbone.Model
    filterState.url = "#{API_URL}/api/v1/search/filtered/artist/#{@artist.id}/suggest"
    filterState.fetch
      cache: @cache
      success: (model, response) ->
        dfd.resolve artworks: !!response?.total
      error: -> dfd.resolve artworks: false

    dfd.promise

  fetchStatus: (name, options = {}) ->
    dfd = Q.defer()
    options = _.defaults options, cache: @cache, size: 1
    resolve = (status) ->
      dfd.resolve _.tap({}, (x) -> x[name] = status)

    @artist.related()[name].fetch
      data: size: options.size
      cache: @cache
      success: (collection) ->
        resolve !!collection.length
      error: -> resolve false

    dfd.promise