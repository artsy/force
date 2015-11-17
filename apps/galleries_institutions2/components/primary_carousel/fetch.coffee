Q = require 'bluebird-q'
OrderedSets = require '../../../../collections/ordered_sets.coffee'

module.exports = class PrimaryCarousel
  key: 'galleries:carousel-galleries' # https://admin.artsy.net/set/5638fdfb7261690296000031

  sets: ->
    @__sets__ ?= new OrderedSets key: @key

  fetch: ->
    @sets()
      .fetchAll cache: true
      .then =>
        @sets().first().get 'items'
      .then (profiles) =>
        Q.all (@profiles = profiles).map (profile) ->
          profile.related().owner.related().shows.fetch()
      .then =>
        @shows = @profiles.map (profile) ->
          profile.related().owner.related().shows.featured()
