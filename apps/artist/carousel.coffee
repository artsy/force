_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
cache = require '../../lib/cache'
{ API_URL } = require('sharify').data
AdditionalImage = require '../../models/additional_image'
InstallShots = require '../../collections/install_shots'
worth = _.partial _.pluck, _, 'value'

module.exports = class Carousel
  installShotsLimit: 2

  constructor: ({ @artist }) ->
    @figures = new Backbone.Collection [], model: AdditionalImage

  fetch: ({ @cache } = {}) ->
    dfd = Q.defer()

    cacheKey = "artist:#{@artist.id}:carousel"
    cache.get cacheKey, (err, cachedData) =>
      return dfd.resolve(@figures.reset(JSON.parse(cachedData))) if cachedData and @cache

      Q.allSettled([
        @fetchAllInstallShots()
        @fetchIconicWorks()
      ]).then((states) =>

        [shots, figures] = worth states
        @figures.reset (shots or []).concat(figures)
        dfd.resolve @figures
        cache.set cacheKey, JSON.stringify(@figures.toJSON())

        dfd.resolve()

      ).done()

    dfd.promise

  fetchIconicWorks: ->
    dfd = Q.defer()

    @artist.related().artworks.fetch
      cache: @cache
      data: sort: '-iconicity', published: true, size: 7
      error: dfd.reject
      success: (artworks) =>
        figures = artworks.map (artwork) ->
          _.extend artwork.defaultImage().attributes, title: artwork.get('title'), href: artwork.href()
        dfd.resolve figures

    dfd.promise

  fetchAllInstallShots: ->
    dfd = Q.defer()

    @artist.related().shows.fetch
      cache: @cache
      data: size: 10, solo_show: true, top_tier: true
      error: dfd.reject
      success: (shows) =>
        Q.allSettled(
          _.compact _.map(shows.filter(@isValidShow), @fetchInstallShotsForShow)
        ).then((states) =>
          dfd.resolve _.take(worth(states), @installShotsLimit)
        ).done()

    dfd.promise

  isValidShow: (show) ->
    # Has some installation shots ... maybe.
    show.get('images_count') > 0

  fetchInstallShotsForShow: (show) =>
    dfd = Q.defer()

    show.installShots = new InstallShots
    show.installShots.fetch
      cache: @cache
      data: default: false, size: 1
      url: "#{API_URL}/api/v1/partner_show/#{show.id}/images"
      error: dfd.reject
      success: (shots, response, options) =>
        if shots.length
          dfd.resolve _.extend(shots.first().attributes, title: show.get('title'), href: show.href())
        else
          dfd.resolve()

    dfd.promise
