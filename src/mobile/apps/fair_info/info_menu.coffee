_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
cache = require '../../lib/cache'
FairEvents = require '../../collections/fair_events'
Articles = require '../../collections/articles'
require '../../../lib/promiseDone'
{ API_URL } = require('sharify').data

module.exports = class InfoMenu
  infoMenu: {}

  constructor: ({ @fair }) ->
    @key = "fair:#{@fair.id}:info_menu"

  fetch: ({ @cache }) ->
    new Promise (resolve, reject) =>
      cache.getHash @key, {}, (err, data) =>
        if data and @cache
          return resolve @infoMenu = data

        Promise.all [
          @fetchEvents()
          @fetchProgramming()
          @fetchAtTheFair()
        ]
          .then (menuItems) =>
            @infoMenu = _.extend {}, menuItems...
            cache.setHash @key, @infoMenu
            resolve @infoMenu
          .catch reject
          .done()

  fetchEvents: ->
    new Promise (resolve) =>
      events = new FairEvents [], { fairId: @fair.id }
      events.fetchUntilEndInParallel
        error: (err) ->
          resolve events: false
        success: (collection, response) ->
          resolve events: !!collection.length

  fetchArticle: (urlParam, key) ->
    new Promise (resolve) =>
      articles = new Articles
      articles.fetch
        data:
          "#{urlParam}": @fair.get('_id')
          published: true
        error: (collection, error) ->
          resolve "#{key}": false
        success: (collection, response) ->
          resolve "#{key}": !!collection.length

  fetchProgramming: ->
    @fetchArticle('fair_programming_id', 'programming')

  fetchAtTheFair: ->
    @fetchArticle('fair_artsy_id', 'artsyAtTheFair')
