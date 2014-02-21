#
# FairOrganizer routes
#
_       = require 'underscore'
Profile = require '../../models/profile.coffee'
Fair    = require '../../models/fair.coffee'
Search  = require '../../collections/search.coffee'

#
# Helpers for fetching the Fair
fetchProfile = (req, res, next, success) ->
  profile = new Profile { id: req.params.id }
  profile.fetch
    cache: true
    success: (profile) ->
      return next() unless profile and profile.isFairOranizer()
      res.locals.sd.PROFILE = profile.toJSON()
      success(profile)
    error: -> next()

fetchFair = (req, res, next, success) ->
  fetchProfile req, res, next, (profile) ->
    fair = new Fair { id: profile.get('owner').default_fair_id }
    fair.fetch
      cache: true
      success: (fair) ->
        res.locals.sd.FAIR = fair.toJSON()
        success(fair, profile)
      error: -> next()

fetchFairData = (fair, profile, res, options) ->
  data =
    fair      : fair
    profile   : profile
    coverImage: profile.coverImage()

  success = _.after 5, ->
    options.success data

  fair.fetchFilteredSearchOptions
    cache: true
    success: (filteredSearchOptions) ->
      data.filteredSearchOptions = filteredSearchOptions
      data.filteredSearchColumns = fair.filteredSearchColumns(filteredSearchOptions, 2, 'related_gene', 'artworks')
      success()
    error: res.backboneError

  fair.fetchPrimarySets
    cache: true
    success: (primarySets) ->
      data.primarySets = primarySets
      success()
    error: res.backboneError

  fair.fetchSections
    cache: true
    success: (sections) ->
      data.sections = sections
      success()
    error: res.backboneError

  fair.fetchExhibitors
    cache: true
    success: (exhibitorsAToZGroup, galleries) ->
      data.exhibitorsCount = galleries.length
      data.exhibitorsAToZGroup = exhibitorsAToZGroup
      success()
    error: res.backboneError

  fair.fetchArtists
    cache: true
    success: (artistsAToZGroup, artists) ->
      data.artistsAToZGroup = artistsAToZGroup
      success()
    error: res.backboneError

#
# Routes
@info = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    res.locals.sd.SECTION = 'info'
    res.render 'templates/index',
      profile : profile
      fair    : fair

# Called from profile/routes
@fairPosts = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    res.locals.sd.SECTION = 'posts'
    res.render '../fair/templates/index',
      profile : profile
      fair    : fair

# Called from profile/routes
@overview = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    fetchFairData fair, profile, res,
      success: (data) ->
        res.locals.sd.SECTION = 'overview'
        # TODO: Dependent on attribute of fair
        res.locals.sd.BODY_CLASS = 'body-transparent-header'
        res.render '../fair/templates/overview', data

@browse = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    fetchFairData fair, profile, res,
      success: (data) ->
        res.locals.sd.SECTION = 'browse'
        res.render 'templates/index', data

@forYou = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    fetchFairData fair, profile, res,
      success: (data) ->
        res.locals.sd.SECTION = 'forYou'
        res.render 'templates/index', data

@search = (req, res, next) ->
  term    = req.query.q
  res.redirect("/#{req.params.id}") unless term
  fetchFair req, res, next, (fair, profile) ->
    fairSearch  = new Search
    search  = new Search
    success = _.after 2, ->
      res.locals.sd.SECTION = 'search'
      res.render 'templates/index',
        profile     : profile
        fair        : fair
        term        : term
        fairResults : fairSearch.models
        results     : search.models

    fairSearch.fetch
      data:
        term: term
        fair_id: fair.get('id')
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
  return res.redirect("/#{req.params.id}") unless req.user

  fetchFair req, res, next, (fair, profile) ->
    res.locals.sd.SECTION = 'favorites'
    res.render 'templates/favorites',
      profile : profile
      fair    : fair
      profileId: req.user.get('default_profile_id')

@follows = (req, res, next) ->
  return res.redirect("/#{req.params.id}") unless req.user

  if (route = req.params.type) in ['artists', 'genes']
    routeToKind = artists: 'artist', genes: 'gene'
    res.locals.sd.KIND = routeToKind[route] or 'artist'
    fetchFair req, res, next, (fair, profile) ->
      res.locals.sd.SECTION = 'follows'
      res.render 'templates/favorites',
        profile : profile
        fair    : fair
        profileId: req.user.get('default_profile_id')
        type: route
  else
    next()

# Fetches show for partner and redirects to the show permalink
@showRedirect = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    fair = new Fair id: profile.get('owner').default_fair_id
    fair.fetchShowForPartner req.params.partner_id,
      success: (show) ->
        res.redirect "/show/#{show.id}"
      error: res.backboneError
