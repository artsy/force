_ = require 'underscore'
OrderedSets = require '../../collections/ordered_sets'
Fairs = require '../../collections/fairs'
query = require './query.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'
Helpers = require './helpers.coffee'

module.exports.index = (req, res, next) ->
  metaphysics
    variables: page: 1, size: 50
    query: query
  .then (data) ->
    { currentFairs, pastFairs, upcomingFairs } = Helpers.parseGroups(data.fairs)

    featuredFairs = _.flatten [currentFairs, pastFairs]
    allFairs = _.flatten [featuredFairs, upcomingFairs]

    remainingPastFairs = _.rest(Helpers.allPastFairs(data.fairs), 6)
    res.locals.sd.FAIRS = currentFairs
    res.locals.sd.PAST_FAIRS = remainingPastFairs
    res.render 'index',
      navItems: [
        { name: 'Current', hasItems: currentFairs.length },
        { name: 'Upcoming', hasItems: upcomingFairs.length },
        { name: 'Past', hasItems: pastFairs.length }
      ]
      emptyMessage: "Past Events"
      extraClasses: "art-fairs-tabs"
      currentFairs: currentFairs
      upcomingFairs: upcomingFairs
      pastFairs: pastFairs
      Helpers: Helpers
      remainingPastFairs: remainingPastFairs

  .catch (err) ->
    console.log 'error'
    console.log err
