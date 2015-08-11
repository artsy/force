_ = require 'underscore'
Q = require 'q'
Fairs = require '../../collections/fairs'
Fair = require '../../models/fair'
OrderedSets = require '../../collections/ordered_sets'
Profile = require '../../models/profile'

representation = (fair) ->
  dfd = Q.defer()
  sets = new OrderedSets(owner_type: 'Fair', owner_id: fair.id, sort: 'key')

  sets.fetchAll(cache: true).then ->
    set = sets.findWhere(key: 'explore')?.get('items')
    fair.representation = set
    dfd.resolve set
  dfd.promise

# Get profiles of fairs that have organizers so we can
# see if they are published or not
profiles = (fairs) ->
  _.compact fairs.map (fair) ->
    if fair.get('has_full_feature') is true
      fair.related().profile.fetch(cache: true)

parseGroups = (fairs) ->
  currentFairs: fairs.filter((fair) -> fair.isCurrent())
  pastFairs: fairs.chain()
    .filter((fair) -> fair.isPast())
    .take(6)
    .value()
  upcomingFairs: fairs.chain()
    .filter((fair) -> fair.isUpcoming())
    .sortBy((fair) -> Date.parse(fair.get 'start_at'))
    .value()

@index = (req, res) ->
  fairs = new Fairs
  fairs.fetch
    cache: true
    data: sort: '-start_at', size: 50
    success: ->
      Q.allSettled(profiles(fairs)).then(->
        { currentFairs, pastFairs, upcomingFairs } = parseGroups(fairs)

        featuredFairs = _.flatten [currentFairs, pastFairs]
        allFairs = _.flatten [featuredFairs, upcomingFairs]

        promises = _.compact _.flatten [
          # Fetch all displayable fairs (so that we can get their location)
          _.map(allFairs, (fair) -> fair.fetch(cache: true))

          # Get the two smaller images to use via the fair 'explore' sets
          # (This is a pretty ineffcient way to go about it though)
          _.map(featuredFairs, representation)
        ]

        Q.allSettled(promises).then(->

          res.locals.sd.FAIRS = currentFairs
          res.render 'index',
            featuredFairs: featuredFairs
            currentFairs: currentFairs
            upcomingFairs: upcomingFairs
            pastFairs: pastFairs

        ).done()
      ).done()
