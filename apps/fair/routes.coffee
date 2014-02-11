#
# FairOrganizer routes
#
Profile = require '../../models/profile'
Fair    = require '../../models/fair'
Search  = require '../../collections/search'

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

#
# Routes
@info = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    res.locals.sd.SECTION = 'info'
    res.render 'templates/index',
      profile : profile
      fair    : fair

# Called from profile/routes
@overview = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    res.locals.sd.SECTION = 'overview'
    res.render '../fair/templates/index',
      profile : profile
      fair    : fair

# Called from profile/routes
@fairPosts = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    res.locals.sd.SECTION = 'posts'
    res.render '../fair/templates/index',
      profile : profile
      fair    : fair

@forYou = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    res.locals.sd.SECTION = 'forYou'
    res.render 'templates/index',
      profile : profile
      fair    : fair

@search = (req, res, next) ->
  term    = req.query.q
  res.redirect("/#{req.params.id}") unless term
  fetchFair req, res, next, (fair, profile) ->
    fairSearch  = new Search
    fairSearch.fetch
      data:
        term: term
        fair_id: fair.get('id')
      cache: true
      success: ->
        fairSearch.updateLocationsForFair(fair)
        search  = new Search
        search.fetch
          data:
            term: term
          cache: true
          success: ->
            res.locals.sd.SECTION = 'search'
            res.render 'templates/index',
              profile     : profile
              fair        : fair
              term        : term
              fairResults : fairSearch.models
              results     : search.models
          error: res.backboneError
      error: res.backboneError

@browse = (req, res, next) ->
  fetchFair req, res, next, (fair, profile) ->
    res.locals.sd.SECTION = 'browse'
    # TODO: Parallelize these fetches
    fair.fetchExhibitors
      success: (exhibitorsAToZGroup, galleries) ->
        fair.fetchArtists
          success: (artistsAToZGroup, artists) ->
            res.render 'templates/index',
              exhibitorsAToZGroup : exhibitorsAToZGroup
              artistsAToZGroup    : artistsAToZGroup
              profile   : profile
              fair      : fair
              artists   : artists
          error: res.backboneError
      error: res.backboneError

@favorites = (req, res, next) ->
  return res.redirect("/#{req.params.id}") unless req.user

  fetchFair req, res, next, (fair, profile) ->
    res.locals.sd.SECTION = 'favorites'
    res.render 'templates/index',
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
      res.render 'templates/index',
        profile : profile
        fair    : fair
        profileId: req.user.get('default_profile_id')
        type: route
  else
    next()
