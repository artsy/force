_ = require 'underscore'
FilterPartners = require './collections/filter_partners.coffee'
{ Profile } = require '../../../../models/profile'
{ Profiles } = require '../../../../collections/profiles'
{ OrderedSets } = require '../../../../collections/ordered_sets'

key =
  gallery: 'galleries:carousel-galleries' # https://admin.artsy.net/set/5638fdfb7261690296000031
  institution: 'institutions:carousel-institutions' # https://admin.artsy.net/set/564e181a258faf3d5c000080

# Refactor these fetches to use metaphysics

fetchFeaturedSet = (type) ->
  sets = new OrderedSets key: key[type]
  Promise.resolve(sets.fetchAll cache: false)
    .then ->
      profiles = sets.first().get 'items'
      showsCollections = profiles.map (profile) -> profile.related().owner.related().shows
      Promise.all(_.invoke showsCollections, 'fetch', cache: false).then ->
        profiles

fetchWithParams = (params) ->
  partners = new FilterPartners
  Promise.resolve(partners.fetch(
    data: _.extend {}, params, eligible_for_carousel: true, size: 6, sort: '-random_score'
  ).then (results) ->
    profiles = new Profiles
    Promise.all(partners.map (partner) ->
      profile = new Profile id: partner.get('default_profile_id')
      profiles.add profile
      Promise.resolve(profile.fetch(cache: true)).then ->
        Promise.resolve(profile.related().owner.related().shows.fetch cache: true)
    ).then ->
      profiles
  )

module.exports = (params) ->
  if params.category or params.location
    fetchWithParams params
  else
    fetchFeaturedSet(params.type)
