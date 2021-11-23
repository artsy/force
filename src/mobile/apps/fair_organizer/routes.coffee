_ = require 'underscore'
{ Profile } = require '../../models/profile'
{ FairOrganizer } = require '../../models/fair_organizer'
{ Fairs } = require '../../collections/fairs'
{ OrderedSets } = require '../../collections/ordered_sets'
{ Articles } = require '../../collections/articles'
require '../../../lib/promiseDone'
moment = require 'moment'

representation = (fair) ->
  new Promise((resolve) ->
    sets = new OrderedSets(owner_type: 'Fair', owner_id: fair.id, sort: 'key')
    sets.fetchAll(cache: true).then ->
      set = sets.findWhere(key: 'explore')?.get('items')
      fair.representation = set
      resolve set
  )

@overview = (req, res, next) ->
  return next() if (not res.locals.fairOrg)
  res.locals.sd.PAGE_TYPE = 'fair-organizer'
  res.render 'index'

#
# For now this is specific to the Armory Show, eventually can be adapted to suit any fair organizer.
#
@fetchFairOrgData = (req, res, next) ->
  profile = res.locals.profile = req.profile

  return next() unless profile?.isFairOrganizer()

  # the fair fair_organizer data is pretty minor,
  # all of its attributes are included in the initial
  # profile fetch
  fairOrg = new FairOrganizer profile.get('owner')

  fairs = new Fairs
  options =
    data:
      fair_organizer_id: fairOrg.id
      sort: "-start_at"

  # This grabs all the past fairs by passing fair_organizer_id
  # to the /fairs endpoint
  Promise.resolve(fairs.fetch(options))
    .then ->
      # find if we have a current fair
      current = fairs.find (fair)->
        moment().utc().isBetween fair.get('start_at'), fair.get('end_at')

      throw new Error() unless current?
      Promise.resolve(current.related().profile.fetch())
    .then (profile) ->
      # redirect to fair if there is a fair currently running and its profile is public.
      res.redirect(new Profile(profile).href())
    .catch ->
      # fetch the past fairs and their respective representations
      # to get the two small images
      # also, grab all the articles associated with the fair from positron
      articles = new Articles()
      promises = _.compact _.flatten [
        fairs.map representation
        articles.fetch(
          cache: true
          data:
            published: true
            'fair_ids[]': fairs.pluck('_id')
            sort: '-published_at'
        )
      ]

      Promise.allSettled(promises).then(->
        res.locals.newestFair = res.locals.sd.FAIR = fairs.models[0]
        res.locals.sd.FAIR_IDS = fairs.pluck('_id')
        res.locals.sd.FAIR_ORGANIZER = fairOrg.toJSON()
        res.locals.sd.ARTICLES = articles.toJSON()
        res.locals.fairOrg = fairOrg
        res.locals.coverImage = profile.coverImage()
        # fairs is the array of links to the previous fairs,
        # since this should only include fairs that have microsites,
        # we filter on has_full_feature.
        # this also allows us to set a fair for the future and
        # have a countdown to the preview
        res.locals.pastFairs = fairs.pastYearRoundFairs()
        res.locals.articles = articles.models
        res.locals.navItems = [
          { name: 'News', hasItems: articles.length },
          { name: 'Previous Years', hasItems: res.locals.pastFairs.length },
          { name: 'About', hasItems: fairOrg.has('about') },
        ]
        res.locals.emptyMessage = "About"
        res.locals.extraClasses = "fair-organization-page__tabs avant-garde-tabs--table"
        next()
      )
