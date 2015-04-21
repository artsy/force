_ = require 'underscore'
moment = require 'moment'
Profile = require '../../models/profile.coffee'
Fair = require '../../models/fair.coffee'
Fairs = require '../../collections/fairs.coffee'
FairOrganizer = require '../../models/fair_organizer.coffee'
Search = require '../../collections/search.coffee'
cache = require '../../lib/cache'
kinds = require '../favorites_follows/kinds'
{ crop, fill } = require '../../components/resizer'

@overview = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  # TODO: Dependent on attribute of fair
  res.locals.sd.BODY_CLASS = 'body-transparent-header'
  res.locals.sd.SECTION = 'overview'
  res.render 'overview'

@info = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  res.locals.sd.SECTION = 'info'
  res.render 'index'

@fairArticles = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  res.locals.sd.SECTION = 'posts'
  res.render 'index'

@browse = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  res.locals.sd.SECTION = 'browse'
  res.render 'index'

@forYou = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  res.locals.sd.SECTION = 'forYou'
  res.render 'index'

@search = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  return res.redirect("/#{req.params.id}") unless term = req.query.q
  fair = res.locals.fair
  fairSearch = new Search
  search = new Search
  success = _.after 2, ->
    res.locals.sd.SECTION = 'search'
    res.render 'index',
      term: term
      fairResults: fairSearch.models
      results: search.models
      crop: crop
      fill: fill

  fairSearch.fetch
    data:
      term: term
      fair_id: res.locals.fair.get('id')
    cache: true
    success: (results) ->
      fairSearch.updateLocationsForFair(fair)
      success()
    error: res.backboneError

  search.fetch
    data:
      term: term
    cache: true
    success: ->
      success()
    error: res.backboneError

@favorites = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  return res.redirect("/#{req.params.id}") unless req.user
  res.locals.sd.SECTION = 'favorites'
  res.render 'favorites', profileId: req.user.get('default_profile_id')

@follows = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  return res.redirect("/#{req.params.id}") unless req.user
  if (route = req.params.type) in _.keys(kinds)
    res.locals.sd.KIND = kinds[route] or 'artist'
    res.locals.sd.SECTION = 'follows'
    res.render 'favorites',
      profileId: req.user.get('default_profile_id')
      type: route
  else
    next()

# Fetches show for partner and redirects to the show permalink
@showRedirect = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  fair = res.locals.fair
  fair.fetchShowForPartner req.params.partner_id,
    error: res.backboneError
    success: (show) -> res.redirect "/show/#{show.id}"

# Fetches and caches fair data to be used across the fair app
@fetchFairData = (req, res, next) ->
  profile = res.locals.profile

  return next() unless profile?.isFair()

  fair = new Fair id: profile.fairOwnerId()

  # set the profile that we fetched initially directly to the fair
  fair.set 'profile', profile
  res.locals.sd.PROFILE = profile.toJSON()

  fair.fetchPrimarySets
    cache: true
    error: res.backboneError
    success: (primarySets) =>
      res.locals.primarySets = primarySets
      end = (data) ->
        res.locals[k] = v for k, v of data
        res.locals.mediums = data.filterSuggest.mediumsHash()
        res.locals.sd.EXHIBITORS_COUNT = data.galleries.length
        res.locals.sd.FAIR = data.fair.toJSON()
        next()
      key = "fair:#{req.params.id}"
      cache.getHash key, {
        fair: require '../../models/fair'
        filterSuggest: require '../../models/filter_suggest'
        filteredSearchOptions: require '../../models/filter_suggest'
        filteredSearchColumns: null # Vanilla JS object
        sections: require('backbone').Collection
        galleries: require('backbone').Collection
        exhibitorsCount: null # Just a Number
        exhibitorsAToZGroup: null # Complex data structures that can't simply be wrapped in a class.
        artistsAToZGroup: null # We'll need to deserialized this manually.
        coverImage: require '../../models/cover_image'
      }, (err, cachedData) ->
        return next err if err
        return end cachedData if cachedData
        fair.fetchOverviewData
          error: res.backboneError
          success: (data) ->
            cache.setHash key, data
            end data

@fetchFairByOrganizerYear = (req, res, next) ->
  profile = res.locals.profile

  return next() unless profile?.isFairOrganizer()

  fairOrg = new FairOrganizer profile.get('owner')

  pastFairs = new Fairs
  pastFairs.fetch
    cache: true
    data:
      fair_organizer_id: fairOrg.id
    success: ->
      fair = pastFairs.find (fair) ->
        fair.formatYear() is parseInt req.params.year

      return next() unless fair

      data = {}
      data.access_token = req.user.get('accessToken') if req.user
      new Profile(id: fair.get('default_profile_id')).fetch
        data: data
        cache: true
        cacheTime: 300
        success: (profile) ->
          res.locals.profile = profile
          next()
