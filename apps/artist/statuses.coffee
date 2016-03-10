_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
cache = require '../../lib/cache'
{ API_URL } = require('sharify').data

module.exports = class Statuses
  statuses: {}

  constructor: ({ @artist }) ->
    @key = "artist:#{@artist.id}:statuses"

  fetch: ({ @cache } = {}) ->
    Q.promise (resolve, reject) =>
      cache.getHash @key, {}, (err, data) =>
        if data and @cache
          return resolve @statuses = data

        Q.all [
          @fetchArticles()
          @fetchStatus 'shows'
          @fetchStatus 'artists'
          @fetchStatus 'contemporary'
        ]
          .then (statuses) =>
            @statuses = _.extend { artworks: @artist.get('published_artworks_count') > 0 }, statuses...
            cache.setHash @key, @statuses
            resolve @statuses
          .catch reject
          .done()

  fetchArticles: ->
    Q.promise (resolve) =>
      @artist.fetch
        cache: @cache
        error: ->
          resolve articles: false
        success: =>
          @artist.related().articles.fetch
            cache: @cache
            data: limit: 50
            error: -> resolve articles: false
            success: (articles, response) ->
              resolve
                articles: !!response?.count
                biography: articles.biography()?

  fetchStatus: (name, options = {}) ->
    Q.promise (resolve) =>
      options = _.defaults options,
        cache: @cache, size: 1

      setStatus = (status) ->
        resolve _.tap({}, (x) -> x[name] = status)

      @artist.related()[name].fetch
        data: size: options.size
        cache: @cache
        success: (collection) ->
          setStatus !!collection.length
        error: ->
          setStatus false
