_ = require 'underscore'
Q = require 'q'
moment = require 'moment'
Fairs = require '../../collections/fairs'
Items = require '../../collections/items'
Profile = require '../../models/profile'
fair_fixtures = require './fixtures/fairs.js'

# Get profiles of fairs that have organizers so we can
# see if they are published or not
profiles = (fairs) ->
  _.compact fairs.map (fair) ->
    if fair.get('has_full_feature') is true
      fair.related().profile.fetch(cache: true)

parseGroups = (fairs, date) ->
  currentFairs: fairs.chain().filter((fair) -> fair.isCurrent(date)).sortBy((fair) -> fair.get('tier')).value()
  pastFairs: fairs.chain()
    .filter((fair) -> fair.isPast(date))
    .sortBy((fair) -> Date.parse(fair.get 'start_at'))
    .value()
  upcomingFairs: fairs.chain()
    .filter((fair) -> fair.isUpcoming(date))
    .sortBy((fair) -> Date.parse(fair.get 'start_at'))
    .value()

@index = (req, res) ->
  allFairs = new Fairs fair_fixtures, parse: true
  date = new Date(req.query.date) || new Date
  fairs = allFairs.aroundDate date
  featuredFairs = new Items [], id: '55a4204d72616970e40000f9'
  { currentFairs, pastFairs, upcomingFairs } = {}

  Q.allSettled(profiles(fairs))
  .then =>
    { currentFairs, pastFairs, upcomingFairs } = parseGroups(fairs, date)
    allFairs = _.flatten [currentFairs, pastFairs, upcomingFairs]
    Q.all _.compact _.flatten [
      _.map(allFairs, (fair) -> fair.fetch(cache: true))
      featuredFairs.fetch(cache: false)
    ]
  .then =>
    res.locals.sd.FAIRS = fairs
    res.render 'index',
      featuredFairs: featuredFairs.models
      currentFairRows: fairs.currentRows(date)
      upcomingFairs: upcomingFairs
      pastFairs: pastFairs
  .done()