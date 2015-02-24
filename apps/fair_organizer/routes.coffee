_ = require 'underscore'
Q = require 'q'
Profile = require '../../models/profile.coffee'
Fair = require '../../models/fair.coffee'
cache = require '../../lib/cache'
OrderedSets = require '../../collections/ordered_sets'
Articles = require '../../collections/articles'
ProfileFixture = require './fixtures/profile.json'
FairFixture = require './fixtures/fair.json'
moment = require 'moment'

representation = (fair) ->
  dfd = Q.defer()
  sets = new OrderedSets(owner_type: 'Fair', owner_id: fair.id, sort: 'key')
  sets.fetchAll(cache: true).then ->
    set = sets.findWhere(key: 'explore')?.get('items')
    fair.representation = set
    dfd.resolve set
  dfd.promise

@overview = (req, res, next) ->
  # go to normal fair page when this fair switches to open or an admin adds
  # a microsite=true param
  return next() if not res.locals.fair or res.locals.fair.hasOpened() or req.query.microsite
  res.locals.sd.HEADER_CLASS = 'force-position-absolute'
  res.render 'overview'

#
# For now this is specific to the Armory Show, eventually can be adapted to suit any fair organizer.
#
@fetchFairData = (req, res, next) ->
  data = {}
  data.access_token = req.user.get('accessToken') if req.user

  # TODO: remove this grossness ASAP
  # -------------------------------
  # in case you are wondering....
  # FairOrganizers are not administerable yet
  # and these are last minute hacks so Fair admins can
  # update the Armory Show Profile without affecting this page
  # :( :( :(
  fair = new Fair FairFixture

  return next() if moment().isAfter moment('2-25-2015')

  profile = new Profile ProfileFixture

  res.locals.profile = profile
  res.locals.sd.PROFILE = profile.toJSON()
  res.locals.jsonLD = profile.toJSONLD()

  armory2013 = new Fair id: 'the-armory-show-2013'
  armory2014 = new Fair id: 'the-armory-show-2014'
  fairIds = ['505797122a5b7500020006a0', '52617c6c8b3b81f094000013',
    '54871f8672616970632a0400']

  pastFairs = [armory2014, armory2013]
  articles = new Articles()

  # fetch the past fairs and their respective representations to get the two small images
  promises = _.compact _.flatten [
    _.map pastFairs, (fair)-> fair.fetch cache: true
    _.map pastFairs, representation
    articles.fetch(
      cache: true
      data: { published: true, fair_ids: fairIds, sort: '-published_at' }
    )
  ]

  Q.allSettled(promises).then(->
    res.locals.sd.FAIR_IDS = fairIds
    res.locals.sd.FAIR = fair.toJSON()
    res.locals.sd.ARTICLES = articles.toJSON()
    res.locals.fair = fair
    res.locals.coverImage = profile.coverImage()
    res.locals.pastFairs = pastFairs
    res.locals.articles = articles.models
    next()
  ).done()

