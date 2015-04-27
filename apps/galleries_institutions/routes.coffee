_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Partner = require '../../models/partner'
Partners = require '../../collections/partners'
Profiles = require '../../collections/profiles'
OrderedSets = require '../../collections/ordered_sets.coffee'

fetchFeaturedProfiles = (key) ->
  dfd = Q.defer()
  featuredPartners = new OrderedSets key: key
  featuredPartners.fetchAll(cache: true).then ->
    profiles = featuredPartners.first().get 'items'
    profiles.map (profile) ->
      partner = new Partner(profile.get 'owner')
      profile.set 'owner', partner
    dfd.resolve profiles
  dfd.promise

fetchGalleries = ->
  dfd = Q.defer()
  galleries = new Partners
  galleries.fetchUntilEndInParallel
    data:
      size: 20
      active: true
      type: 'PartnerGallery'
      sort: 'sortable_id'
      has_full_profile: true
    cache: true
    success: dfd.resolve
    error: dfd.reject
  dfd.promise

fetchInstitutions = ->
  dfd = Q.defer()
  profiles = new Profiles
  profiles.fetchUntilEndInParallel
    url: "#{API_URL}/api/v1/set/51fbd2f28b3b81c2de000444/items"
    data: size: 20
    cache: true
    success: dfd.resolve
    error: dfd.resolve
  dfd.promise

@partners = (req, res) ->
  Q.allSettled([
    fetchFeaturedProfiles('partners:featured-galleries')
    fetchFeaturedProfiles('partners:featured-institutions')
  ]).then((results) ->
    [featuredGalleries, featuredInstitutions] = _.pluck results, 'value'
    featuredGalleries.add(featuredInstitutions.models)
    res.render 'index',
      featuredProfiles: featuredGalleries.take(20)
      copy: header: 'Featured Partners'
  ).done

@galleries = (req, res) ->
  Q.allSettled([
    fetchFeaturedProfiles('partners:featured-galleries')
    fetchGalleries()
  ]).then((results) ->
    [featuredGalleries, galleries] = _.pluck results, 'value'
    aToZGroup = galleries.groupByAlphaWithColumns 3
    res.render 'index',
      aToZGroup: aToZGroup
      partnerCount: '600+'
      featuredProfiles: _.take featuredGalleries.shuffle(), 15 # Make room for partnership callout
      copy:
        header: 'Featured Galleries'
        adjective: 'Gallery'
        href: '/gallery-partnerships'
  ).done()

@institutions = (req, res) ->
  Q.allSettled([
    fetchFeaturedProfiles('partners:featured-institutions')
    fetchInstitutions()
  ]).then((results) ->
    [featuredInstitutions, institutions] = _.pluck results, 'value'
    aToZGroup = institutions.groupByAlphaWithColumns 3
    res.render 'index',
      aToZGroup: aToZGroup
      featuredProfiles: _.take featuredInstitutions.shuffle(), 16
      copy:
        header: 'Featured Museums and Institutions'
        adjective: 'Institutional'
        href: '/pdf/institutions-overview.pdf'
  ).done()
