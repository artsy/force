Q = require 'bluebird-q'
OrderedSets = require '../../../../collections/ordered_sets.coffee'
_ = require 'underscore'
FilterPartners = require '../../../../collections/filter_partners.coffee'
Profile = require '../../../../models/profile.coffee'
Profiles = require '../../../../collections/profiles.coffee'

key =
  gallery: 'galleries:carousel-galleries' # https://admin.artsy.net/set/5638fdfb7261690296000031
  institution: 'institutions:carousel-institutions' # https://admin.artsy.net/set/564e181a258faf3d5c000080

fetchFeaturedSet = (type) ->
  sets = new OrderedSets key: key[type]
  Q(sets.fetchAll cache: true)
    .then ->
      profiles = sets.first().get 'items'
      showsCollections = profiles.map (profile) -> profile.related().owner.related().shows
      Q.all(_.invoke showsCollections, 'fetch', cache: true).then ->
        profiles

fetchWithParams = (params) ->
  partners = new FilterPartners
  Q(partners.fetch(
    data: _.extend params, eligible_for_primary_bucket: true
  )).then ->
    profiles = new Profiles
    Q.all(partners.first(3).map (partner) ->
      profile = new Profile id: partner.get('default_profile_id')
      profiles.add profile
      Q(profile.fetch(cache: true)).then ->
        Q(profile.related().owner.related().shows.fetch cache:true)
    ).then ->
      profiles

module.exports = (params) ->
  if params.category or params.location
    fetchWithParams params
  else
    fetchFeaturedSet(params.type)

