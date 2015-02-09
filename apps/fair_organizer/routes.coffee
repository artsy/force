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
  # go to normal fair page when this fair switches to open
  return next() if not res.locals.fair or res.locals.fair.hasOpened()
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
    cache: true
    success: (profile) ->
      res.locals.profile = profile
      res.locals.sd.PROFILE = profile.toJSON()
      res.locals.jsonLD = profile.toJSONLD()
      res.locals.tab = req.params.tab
    complete: ->
      profile = res.locals.profile
      return next() unless profile?.isFairOrOrganizer() and profile?.ownerHasId()
      fair = new Fair id: 'the-armory-show-2015'
      fair.fetch
        error: res.backboneError
        cache: true
        success: =>
          # This is the specific-to-armory part
          # Eventually we will fetch the organizer's past fairs here.
          armory2013 = new Fair id: 'the-armory-show-2013'
          armory2014 = new Fair id: 'the-armory-show-2014'

          pastFairs = [armory2014, armory2013]
          articles = new Articles()

          # fetch the past fairs and their respective representations to get the two small images
          promises = _.compact _.flatten [
            _.map pastFairs, (fair)-> fair.fetch cache: true
            _.map pastFairs, representation
            # TODO: Update Positron & wire up to actual fair organizer & not
            # hardcoded to The Armory Show 2014.
            articles.fetch(
              cache: true
              data:
                published: true
                author_id: (res.locals.sd.AUTHOR_ID = '54b706957261694f37e20100')
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

