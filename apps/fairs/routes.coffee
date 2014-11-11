_ = require 'underscore'
Q = require 'q'
sd = require('sharify').data
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

@index = (req, res) ->
  fairs = new Fairs
  fairs.fetch
    cache: true
    data: sort: '-start_at', size: 50
    success: (collection, response, options) ->
      currentFairs = fairs.filter (fair) -> fair.isCurrent()
      upcomingFairs = fairs.filter (fair) -> fair.isUpcoming()
      pastFairs = fairs.filter (fair) -> fair.isPast()

      sd.FEATURED_FAIRS = featuredFairs = if currentFairs.length then currentFairs else pastFairs
      allFairs = _.flatten [featuredFairs, upcomingFairs]

      promises = _.compact _.flatten([
        # Fetch all displayable fairs (so that we can get their location)
        _.map(allFairs, (fair) -> fair.fetch(cache: true))

        # Get the two smaller images to use via the fair 'explore' sets
        # (This is a pretty ineffcient way to go about it though)
        _.map(featuredFairs, representation)

        # Fetch all profiles of featured fairs (so that we can get their logo)
        # Currently not useful due to images being square; open issue.
        # _.map(featuredFairs, (fair) ->
        #   fair.profile = new Profile id: fair.get('organizer').profile_id
        #   fair.profile.fetch(cache: true)
        # )
      ])

      Q.allSettled(promises).then(->

        res.render 'index',
          featuredFairs: featuredFairs
          currentFairs: currentFairs
          upcomingFairs: upcomingFairs
          pastFairs: pastFairs

      ).done()
