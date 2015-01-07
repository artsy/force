_ = require 'underscore'
Profile = require '../../models/profile.coffee'
Fair = require '../../models/fair.coffee'
Search = require '../../collections/search.coffee'
cache = require '../../lib/cache'
kinds = require '../favorites_follows/kinds'
{ crop, fill } = require '../../components/resizer'


@overview = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  res.locals.sd.BODY_CLASS = 'body-transparent-header'
  res.render 'overview'

# !! this is extremely temporary until we push the gravity fair organizer updates
@fetchFairData = (req, res, next) ->
  data = {}
  data.access_token = req.user.get('accessToken') if req.user
  new Profile(id: 'the-armory-show').fetch
    data: data
    success: (profile) ->
      res.locals.profile = profile
      res.locals.sd.PROFILE = profile.toJSON()
      res.locals.jsonLD = profile.toJSONLD()
      res.locals.tab = req.params.tab
    complete: ->
      profile = res.locals.profile
      return next() unless profile?.isFairOrganizer() and profile?.get('owner').default_fair_id
      fair = new Fair id: profile.get('owner').default_fair_id
      fair.fetchPrimarySets
        error: res.backboneError
        success: (primarySets) =>
          res.locals.primarySets = primarySets
          end = (data) ->
            res.locals[k] = v for k, v of data
            res.locals.sd.FAIR = data.fair.toJSON()
            res.locals.sd.PROFILE = data.profile.toJSON()
            next()
          key = "fair:#{req.params.id}"
          cache.getHash key, {
            fair: require '../../models/fair'
            profile: require '../../models/profile'
            coverImage: require '../../models/cover_image'
          }, (err, cachedData) ->
            return next err if err
            return end cachedData if cachedData
            fair.fetchOverviewData
              error: res.backboneError
              success: (data) ->
                cache.setHash key, data
                end data