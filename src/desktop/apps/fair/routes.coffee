_ = require 'underscore'
Q = require 'bluebird-q'
moment = require 'moment'
Backbone = require 'backbone'
Profile = require '../../models/profile.coffee'
Fair = require '../../models/fair.coffee'
Fairs = require '../../collections/fairs.coffee'
FairOrganizer = require '../../models/fair_organizer.coffee'
FollowProfile = require '../../models/follow_profile.coffee'
Search = require '../../collections/search.coffee'
cache = require '../../lib/cache'
{ crop, fill } = require '../../components/resizer'
{ captureSignup, validActions } = require './components/capture_signup/index.coffee'
{ parse, format } = require 'url'
FilterArtworks = require '../../collections/filter_artworks'
aggregationParams = require './components/browse/aggregations.coffee'
InfoMenu = require '../../components/info_menu/index.coffee'

DEFAULT_CACHE_TIME = 60

@overview = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  filterArtworks = new FilterArtworks
  fair = res.locals.fair
  params = new Backbone.Model fair: fair.id
  filterData = { size: 0, fair_id: fair.id, aggregations: aggregationParams }
  infoMenu = new InfoMenu(fair: fair)
  Q.all([
    fair.fetch(cache: true, cacheTime: DEFAULT_CACHE_TIME)
    infoMenu.fetch(cache: true, cacheTime: DEFAULT_CACHE_TIME)
  ]).then () ->
    res.locals.infoMenu = infoMenu.infoMenu
    # TODO: Dependent on attribute of fair
    res.locals.sd.BODY_CLASS = 'body-transparent-header'
    res.locals.sd.SECTION = 'overview'
    res.locals.sd.INCLUDE_SAILTHRU = true
    filterArtworks.fetch
      data: filterData
      success: ->
        res.render 'overview',
          counts: filterArtworks.counts
          params: params
          filterRoot: fair.href() + '/browse/artworks'
          hideForSaleButton: true
          includeAllWorksButton: true

@fairArticles = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  res.locals.sd.SECTION = 'posts'
  res.render 'index'

@browse = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  filterArtworks = new FilterArtworks
  fair = res.locals.fair
  params = new Backbone.Model fair: fair.id
  filterData = { size: 0, fair_id: fair.id, aggregations: aggregationParams }
  filterArtworks.fetch
    data: filterData
    success: ->
      res.locals.sd.SECTION = 'browse'

      res.render 'index',
        counts: filterArtworks.counts
        params: params
        filterRoot: fair.href() + '/browse/artworks'
        hideForSaleButton: true
        includeAllWorksButton: true

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

# Fetches show for partner and redirects to the show permalink
@showRedirect = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  fair = res.locals.fair
  fair.fetchShowForPartner req.params.partner_id,
    error: res.backboneError
    success: (show) -> res.redirect "/show/#{show.id}"

@malformedFilterRedirect = (req, res, next) ->
  res.redirect 301, "/#{req.params.id}/browse/artworks"

# Captures fair-specific sign-up.
# Adds a user fair action to the users collector profile and follows the fair profile.
# If the user is an attendee, redirect to fair page with flash message (found in ./components/capture_signup)
# Otherwise, go to normal signup flow
@captureSignup = (req, res, next) ->
  action = req.params.action || 'attendee'
  return next() unless res.locals.fair and req.user and validActions[action]

  { collectorProfile } = req.user.related()
  { userFairActions } = collectorProfile.related()

  followProfile = new FollowProfile profile_id: res.locals.fair.profileId()

  Q.all [
    userFairActions.create
      fair_id: res.locals.fair.id
      action: validActions[action]
      access_token: req.user.get 'accessToken'
    followProfile.save
      access_token: req.user.get 'accessToken'
  ]
  .then ->
    switch action
      when "attendee"
        return next()
      else
        return res.redirect '/personalize'
  .catch next

# Fetches and caches fair data to be used across the fair app
@fetchFairData = (req, res, next) ->
  profile = res.locals.profile

  return next() unless profile?.isFair()
  res.locals.sd.PAGE_TYPE = 'fair'

  fair = new Fair id: profile.fairOwnerId()

  # set the profile that we fetched initially directly to the fair
  fair.set 'profile', profile
  res.locals.sd.PROFILE = profile.toJSON()

  fair.fetchPrimarySets
    cache: true
    cacheTime: DEFAULT_CACHE_TIME
    error: res.backboneError
    success: (primarySets) =>
      res.locals.primarySets = primarySets
      end = (data) ->
        res.locals[k] = v for k, v of data
        res.locals.sd.EXHIBITORS_COUNT = data.galleries.length
        res.locals.sd.FAIR = data.fair.toJSON()
        next()
      key = "fair:#{req.params.id}"
      cache.getHash key, {
        fair: require '../../models/fair'
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
            cache.client?.expire key, DEFAULT_CACHE_TIME
            end data

@fetchFairByOrganizerYear = (req, res, next) ->
  profile = res.locals.profile

  return next() unless profile?.isFairOrganizer()

  fairOrg = profile.related().owner

  # Get all fairs for the requested fair organizer
  pastFairs = new Fairs
  pastFairs.fetch
    cache: true
    data:
      fair_organizer_id: fairOrg.id
    success: ->
      # find the fair whose year matches the requested year
      fair = pastFairs.find (fair) ->
        fair.formatYear() is parseInt req.params.year

      return next() unless fair

      # if we get a fair, fetch its profile and next to @fetchFairData
      data = {}
      data.access_token = req.user.get('accessToken') if req.user
      new Profile(id: fair.get('default_profile_id')).fetch
        data: data
        cache: true
        cacheTime: 300
        success: (profile) ->
          res.locals.profile = profile
          req.params.id = profile.fairOwnerId()
          next()

#
# Checks for the presence of a microsite flag in the query string,
# as well as query params for fair_id, fair_name, and profile_id,
# then sets up the locals to fill in data needed for the fair_layout
# component to function on pages like artwork pages.
#
@microsite = (req, res, next) ->
  microsite = res.locals.sd.MICROSITE =
    (qs = req.query).microsite? and qs.fair_id? and qs.fair_name? and qs.profile_id?
  if microsite
    Profile = require '../../models/profile.coffee'
    Fair = require '../../models/fair.coffee'
    fair = res.locals.micrositeFair = new Fair
      id: qs.fair_id
      name: qs.fair_name
      organizer: profile_id: qs.profile_id
    profile = res.locals.micrositeProfile = new Profile
      id: qs.profile_id
      icon:
        image_url: (
          "#{res.locals.sd.API_URL}/api/v1/profile/" +
          "#{qs.profile_id}/image?xapp_token=#{res.locals.sd.ARTSY_XAPP_TOKEN}"
        )
        image_versions: ['square140']
    res.locals.sd.MICROSITE_FAIR = fair.toJSON()
    res.locals.sd.MICROSITE_PROFILE = profile.toJSON()
    res.locals.fair = fair
    res.locals.profile = profile
  next()
