_ = require 'underscore'
Q = require 'bluebird-q'
moment = require 'moment'
Profile = require '../../models/profile.coffee'
FairOrganizer = require '../../models/fair_organizer.coffee'
Fairs = require '../../collections/fairs.coffee'
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
  # go to normal fair page when this fair switches to open or an admin adds
  # a microsite=true param
  return next() if not res.locals.fairOrg
  res.locals.sd.HEADER_CLASS = 'force-position-absolute'
  res.render 'overview'

@fetchFairOrgData = (req, res, next) ->
  profile = res.locals.profile

  return next() unless profile?.isFairOrganizer()

  # the fair fair_organizer data is pretty minor,
  # all of its attributes are included in the initial
  # profile fetch
  fairOrg = new FairOrganizer profile.get('owner')

  pastFairs = new Fairs

  # This grabs all the past fairs by passing fair_organizer_id
  # to the /fairs endpoint
  pastFairs.fetch
    cache: true
    data:
      fair_organizer_id: fairOrg.get('_id')
    success: (models, response, options)->
      articles = new Articles()

      # find if we have a current fair
      current = pastFairs.find (fair)->
        moment().isBetween fair.get('start_at'), fair.get('end_at')

      # redirect to fair if there is a fair currently running.
      return res.redirect(current.fairOrgHref()) if current

      # fetch the past fairs and their respective representations
      # to get the two small images
      # also, grab all the articles associated with the fair from positron
      promises = _.compact _.flatten [
        pastFairs.map representation
        articles.fetch(
          data:
            published: true
            fair_ids: pastFairs.pluck('_id')
            sort: '-published_at'
        )
      ]

      newestFair = pastFairs.models[0]

      Q.allSettled(promises).then(->
        res.locals.newestFair = res.locals.sd.FAIR = newestFair
        res.locals.sd.FAIR_IDS = pastFairs.pluck('_id')
        res.locals.sd.FAIR_ORGANIZER = fairOrg.toJSON()
        res.locals.sd.ARTICLES = articles.toJSON()
        res.locals.fairOrg = fairOrg
        res.locals.coverImage = profile.coverImage()
        # If the fair names are not identical then
        # we should show the name (instead of the year) on the fair representation
        res.locals.showName = pastFairs.any (fair) ->
          fair.get('name').replace(/\d/g,'') isnt newestFair.get('name').replace(/\d/g,'')
        # pastFairs is the array of links to the previous fairs,
        # since this should only include fairs that have microsites,
        # we filter on has_full_feature.
        # this also allows us to set a fair for the future and
        # have a countdown to the preview
        res.locals.pastFairs = res.locals.sd.PAST_FAIRS = pastFairs.filter (fair) ->
          fair.get('has_full_feature') && fair.representation?
        res.locals.articles = articles.models
        next()
      ).done()

