_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
cache = require '../../lib/cache'
FairEvents = require '../../collections/fair_events'
Articles = require '../../collections/articles'
{ API_URL } = require('sharify').data

module.exports = class InfoMenu
  infoMenu: {}

  constructor: ({ @fair }) ->
    @key = "fair:#{@fair.id}:info_menu"

  fetch: ({ @cache }) ->
    Q.promise (resolve, reject) =>

      cache.getHash @key, {}, (err, data) =>
        if data and @cache
          return resolve @infoMenu = data

        Q.all [
          @fetchEvents()
          @fetchProgramming()
          @fetchAtTheFair()
          @fetchAboutTheFair()
        ]
          .then (menuItems) =>
            @infoMenu = _.extend {}, menuItems...
            cache.setHash @key, @infoMenu
            resolve @infoMenu
          .catch reject
          .done()

  fetchEvents: ->
    Q.promise (resolve) =>
      events = new FairEvents [], { fairId: @fair.id }
      events.fetch
        error: ->
          resolve events: false
        success: (collection, response) ->
          resolve events: !!collection.length

  fetchArticle: (urlParam, key) ->
    Q.promise (resolve) =>
      data = {}
      data[urlParam] = @fair.id
      articles = new Articles
      articles.fetch
        data: data
        error: ->
          resolve "#{key}": false
        success: (collection, response) ->
          resolve "#{key}": !!collection.length

  fetchProgramming: ->
    @fetchArticle('fair_programming_ids', 'programming')

  fetchAtTheFair: ->
    @fetchArticle('fair_artsy_ids', 'artsyAtTheFair')

  fetchAboutTheFair: ->
    @fetchArticle('fair_about_ids', 'aboutTheFair')
