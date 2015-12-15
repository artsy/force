Q = require 'bluebird-q'
OrderedSets = require '../../../../collections/ordered_sets.coffee'
_ = require 'underscore'

module.exports = class PrimaryCarousel

  key:
    gallery: 'galleries:carousel-galleries' # https://admin.artsy.net/set/5638fdfb7261690296000031
    institution: 'institutions:carousel-institutions' # https://admin.artsy.net/set/564e181a258faf3d5c000080

  fetch: (type) ->
    sets = new OrderedSets key: @key[type]
    sets.fetchAll cache: true
      .then ->
        profiles = sets.first().get 'items'
        showsCollections = profiles.map (profile) -> profile.related().owner.related().shows
        Q.all(_.invoke showsCollections, 'fetch', cache: true).then ->
          profiles
