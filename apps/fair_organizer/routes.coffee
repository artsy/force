_ = require 'underscore'
Q = require 'q'
Profile = require '../../models/profile.coffee'
Fair = require '../../models/fair.coffee'
cache = require '../../lib/cache'
OrderedSets = require '../../collections/ordered_sets'

representation = (fair) ->
  dfd = Q.defer()
  sets = new OrderedSets(owner_type: 'Fair', owner_id: fair.id, sort: 'key')
  sets.fetchAll(cache: true).then ->
    set = sets.findWhere(key: 'explore')?.get('items')
    fair.representation = set
    dfd.resolve set
  dfd.promise

@overview = (req, res, next) ->
  return next() unless res.locals.sd.FAIR
  res.locals.sd.HEADER_CLASS = 'force-position-absolute'
  res.render 'overview'

#
# For now this is specific to the Armory Show, eventually can be adapted to suit any fair organizer.
#
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
      return next() unless profile?.isFairOrOrganizer() and profile?.ownerHasId()
      fair = new Fair id: profile.ownerId()
      fair.fetch
        error: res.backboneError
        success: =>
          # This is the specific-to-armory part
          # Eventually we will fetch the organizer's past fairs here.
          armory2013 = new Fair id: 'the-armory-show-2013'
          # armory2014 = new Fair id: 'the-armory-show-2014'

          pastFairs = [armory2013] # leave 2014 off for now

          # fetch the past fairs and their respective representations to get the two small images
          promises = _.compact _.flatten [
            _.map pastFairs, (fair)-> fair.fetch cache: true
            _.map pastFairs, representation
          ]

          Q.allSettled(promises).then(->
            res.locals.sd.FAIR = fair.toJSON()
            res.locals.fair = fair
            res.locals.coverImage = profile.coverImage()
            res.locals.pastFairs = pastFairs
            next()
          ).done()

