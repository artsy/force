_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
AdditionalImage = require '../../models/additional_image'

module.exports = class Carousel
  constructor: ({ @artist }) ->
    @figures = new Backbone.Collection [], model: AdditionalImage

  fetch: ({ @cache } = {}) ->
    dfd = Q.defer()
    Q.allSettled([
      @fetchIconicWorks()
      @fetchAllInstallShots()
    ]).then(=>
      dfd.resolve @figures
    ).done()
    dfd.promise

  fetchIconicWorks: ->
    @artist.related().artworks.fetch
      cache: @cache
      data: sort: '-iconicity', published: true, size: 7
      success: (artworks) =>
        @figures.add artworks.map (artwork) ->
          _.extend artwork.defaultImage().attributes,
            title: artwork.get('title'), href: artwork.href()

  fetchAllInstallShots: ->
    dfd = Q.defer()
    @artist.related().shows.fetch
      cache: @cache
      data: size: 10
      success: (shows) =>
        Q.allSettled(_.map(shows.filter(@isValidShow), @fetchInstallShotsForShow)).then dfd.resolve
      error: dfd.resolve
    dfd.promise

  isValidShow: (show) =>
    # Has some installation shots
    show.get('images_count') > 0 and
    # Ensure solo shows
    show.get('artists').length is 1

  fetchInstallShotsForShow: (show) =>
    new Backbone.Collection().fetch
      cache: @cache
      data: default: false, size: 1
      url: "#{API_URL}/api/v1/partner_show/#{show.id}/images"
      success: (shots, response, options) =>
        @figures.unshift shots.map (shot) ->
          # Set title and href to the parent show
          _.extend shot.attributes, title: show.get('title'), href: show.href()
