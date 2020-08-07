_ = require 'underscore'
moment = require 'moment'
Profile = require '../../models/profile.coffee'
FairOrganizer = require '../../models/fair_organizer.coffee'
Fairs = require '../../collections/fairs.coffee'
Fair = require '../../models/fair.coffee'
cache = require '../../lib/cache'
OrderedSets = require '../../collections/ordered_sets'
Articles = require '../../collections/articles'

representation = (fair) ->
  new Promise((resolve) ->
    sets = new OrderedSets(owner_type: 'Fair', owner_id: fair.id, sort: 'key')
    sets.fetchAll(cache: true).then ->
      set = sets.findWhere(key: 'explore')?.get('items')
      fair.representation = set
      resolve set
  )

@overview = (req, res, next) ->
  # go to normal fair page when this fair switches to open or an admin adds
  # a microsite=true param
  return next() if not res.locals.fairOrg
  res.locals.sd.PAGE_TYPE = 'fair-organizer'
  res.locals.sd.HEADER_CLASS = 'force-position-absolute'
  res.render 'overview'

@fetchFairOrgData = (req, res, next) ->
  profile = res.locals.profile

  return next() unless profile?.isFairOrganizer()

  # the fair fair_organizer data is pretty minor,
  # all of its attributes are included in the initial
  # profile fetch
  fairOrg = profile.related().owner

  fairs = new Fairs
  options =
    cache: true
    data:
      fair_organizer_id: fairOrg.get('_id')
      sort: "-start_at"

  # This grabs all the past fairs by passing fair_organizer_id
  # to the /fairs endpoint
  Promise.resolve(fairs.fetch(options))
    .then ->
      # find if we have a current fair
      current = fairs.find (fair)->
        moment().utc().isBetween fair.get('autopublish_artworks_at'), fair.get('end_at')

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
          data:
            published: true
            'fair_ids[]': fairs.pluck('_id')
            sort: '-published_at'
        )
      ]

      newestFair = fairs.models[0]

      Promise.allSettled(promises).then(->
        res.locals.newestFair = res.locals.sd.FAIR = newestFair
        res.locals.sd.FAIR_IDS = fairs.pluck('_id')
        res.locals.sd.FAIR_ORGANIZER = fairOrg.toJSON()
        res.locals.sd.ARTICLES = articles.toJSON()
        res.locals.fairOrg = fairOrg
        res.locals.coverImage = profile.coverImage()
        # If the fair names are not identical then
        # we should show the name (instead of the year) on the fair representation
        res.locals.showName = fairs.any (fair) ->
          fair.get('name').replace(/\d/g,'') isnt newestFair.get('name').replace(/\d/g,'')

        res.locals.pastFairs = res.locals.sd.PAST_FAIRS = fairs.pastYearRoundFairs()
        res.locals.articles = articles.models
        next()
      )
