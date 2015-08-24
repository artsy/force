_ = require 'underscore'
Q = require 'q'
moment = require 'moment'
Fairs = require '../../collections/fairs'
Items = require '../../collections/items'
Profile = require '../../models/profile'

# Get profiles of fairs that have organizers so we can
# see if they are published or not
profiles = (fairs) ->
  _.compact fairs.map (fair) ->
    if fair.get('has_full_feature') is true
      fair.related().profile.fetch(cache: true)

parseGroups = (fairs) ->
  currentFairs: fairs.currentFairs()
  pastFairs: fairs.chain()
    .filter((fair) -> fair.isPast())
    .sortBy((fair) -> - Date.parse(fair.get 'start_at'))
    .value()
  upcomingFairs: fairs.chain()
    .filter((fair) -> fair.isUpcoming())
    .sortBy((fair) -> Date.parse(fair.get 'start_at'))
    .take(10)
    .value()

@index = (req, res) ->
  fairs = new Fairs
  fairs.fetch
    cache: true
    data:
      sort: '-start_at'
      size: 40
      has_full_feature: true
    success: =>
      featuredFairs = new Items [], id: '55a4204d72616970e40000f9'
      { currentFairs, pastFairs, upcomingFairs } = {}

      Q.allSettled(profiles(fairs))
      .then =>
        { currentFairs, pastFairs, upcomingFairs } = parseGroups(fairs)
        allFairs = _.flatten [currentFairs, pastFairs, upcomingFairs]
        Q.all [
          _.map(allFairs, (fair) -> fair.fetch(cache: true))
          featuredFairs.fetch()
        ]
      .then =>
        res.locals.sd.FAIRS = fairs
        res.render 'index',
          featuredFairs: featuredFairs.models
          currentFairRows: fairs.currentRows()
          upcomingFairs: upcomingFairs
          pastFairs: pastFairs
      .done()