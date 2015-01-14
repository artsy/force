_ = require 'underscore'
Q = require 'q'
Profile = require '../../models/profile.coffee'
Fair = require '../../models/fair.coffee'
cache = require '../../lib/cache'
OrderedSets = require '../../collections/ordered_sets'
Articles = require '../../collections/articles'

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

  # manually fetching the profile here, since we don't want to override /the-armory-show just yet
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
          # go to normal fair page when this fair switches to open
          return next() if fair.get('auctionState') is 'open'

          # This is the specific-to-armory part
          # Eventually we will fetch the organizer's past fairs here.
          armory2013 = new Fair id: 'the-armory-show-2013'
          armory2014 = new Fair id: 'the-armory-show-2014'

          pastFairs = [armory2013, armory2014]
          articles = new Articles()

          # fetch the past fairs and their respective representations to get the two small images
          promises = _.compact _.flatten [
            _.map pastFairs, (fair)-> fair.fetch cache: true
            _.map pastFairs, representation
            # TODO: Update Positron & wire up to actual fair organizer & not
            # hardcoded to The Armory Show 2013.
            articles.fetch(
              cache: true
              data:
                published: true
                author_id: (res.locals.sd.AUTHOR_ID = '530c0a4a8b3b81d77100001a')
            )
          ]

          Q.allSettled(promises).then(->
            res.locals.sd.FAIR = fair.toJSON()
            res.locals.sd.ARTICLES = articles.toJSON()
            res.locals.fair = fair
            res.locals.coverImage = profile.coverImage()
            res.locals.pastFairs = pastFairs
            res.locals.articles = articles.models
            next()
          ).done()

