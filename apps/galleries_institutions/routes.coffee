_ = require 'underscore'
Q = require 'bluebird-q'
{ API_URL } = require('sharify').data
Partner = require '../../models/partner'
Partners = require '../../collections/partners'
Profiles = require '../../collections/profiles'
OrderedSets = require '../../collections/ordered_sets.coffee'

fetch =
  profiles: (key) ->
    Q.promise (resolve) ->
      featuredPartners = new OrderedSets key: key
      featuredPartners.fetchAll(cache: true)
        .then ->
          profiles = featuredPartners.first().get 'items'
          resolve profiles

  galleries: ->
    new Partners()
      .fetchUntilEndInParallel
        cache: true
        data:
          size: 20
          active: true
          type: 'PartnerGallery'
          sort: 'sortable_id'
          has_full_profile: true

  institutions: ->
    new Profiles()
      .fetchUntilEndInParallel
        cache: true
        url: "#{API_URL}/api/v1/set/51fbd2f28b3b81c2de000444/items"
        data: size: 20

@partners = (req, res, next) ->
  Q.all([
    fetch.profiles 'partners:featured-galleries'
    fetch.profiles 'partners:featured-institutions'
  ])

  .spread (galleries, institutions) ->
    galleries.fullCollection.add institutions.fullCollection.toJSON()
    profiles = new Profiles galleries.fullCollection.toJSON()

    res.render 'index',
      featuredProfiles: _.take profiles.shuffle(), 15 # Make room for partnership callout
      copy: header: 'Featured Partners'

  .catch next
  .done()

@redirectPartner = (req, res, next) ->
  res.redirect 301, req.url.replace 'partner', 'partners'

@galleries = (req, res, next) ->
  Q.all([
    fetch.profiles 'partners:featured-galleries'
    fetch.galleries()
  ])

  .spread (featuredGalleries, galleries) ->
    aToZGroup = galleries.groupByAlphaWithColumns 3

    res.render 'index',
      aToZGroup: aToZGroup
      partnerCount: '600+'
      featuredProfiles: _.take featuredGalleries.shuffle(), 15 # Make room for partnership callout
      copy:
        header: 'Featured Galleries'
        adjective: 'Gallery'
        href: '/gallery-partnerships'

  .catch next
  .done()

@redirectGallery = (req, res, next) ->
  res.redirect 301, req.url.replace 'gallery', 'galleries'

@institutions = (req, res, next) ->
  Q.all([
    fetch.profiles 'partners:featured-institutions'
    fetch.institutions()
  ])

  .spread (featuredInstitutions, institutions) ->
    aToZGroup = institutions.groupByAlphaWithColumns 3
    res.render 'index',
      aToZGroup: aToZGroup
      featuredProfiles: _.take featuredInstitutions.shuffle(), 11 # Make room for partnership callout
      copy:
        header: 'Featured Museums and Institutions'
        adjective: 'Institutional'
        href: '/institution-partnerships'

  .catch next
  .done()

@redirectInstitution = (req, res, next) ->
  res.redirect 301, req.url.replace 'institution', 'institutions'

