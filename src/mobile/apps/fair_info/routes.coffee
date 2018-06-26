_ = require 'underscore'
sd = require('sharify').data
Q = require 'bluebird-q'
Profile = require '../../models/profile.coffee'
Fair = require '../../models/fair.coffee'
PartnerLocation = require '../../models/partner_location.coffee'
FairEvent = require '../../models/fair_event.coffee'
FairEvents = require '../../collections/fair_events.coffee'
InfoMenu = require './info_menu.coffee'
Articles = require '../../collections/articles.coffee'
Article = require '../../models/article.coffee'

module.exports.assignFair = (req, res, next) ->
  return next() unless req.profile?.isFair()
  res.locals.sd.PAGE_TYPE = 'fair'
  fair = new Fair req.profile.get('owner')
  infoMenu = new InfoMenu fair: fair
  Q.all([
    fair.fetch(cache: false)
    infoMenu.fetch(cache: false)
  ]).then () ->
    res.locals.fair = fair
    res.locals.infoMenu = infoMenu.infoMenu
    res.locals.sd.FAIR = fair.toJSON()
    next()
  .catch (error) ->
    next()
  .done()

module.exports.info = (req, res, next) ->
  return next() unless fair = res.locals.fair
  res.render 'index',
    location: new PartnerLocation res.locals.fair.get('location')

module.exports.visitors = (req, res, next) ->
  return next() unless fair = res.locals.fair
  location = new PartnerLocation fair.get('location')
  res.render 'visitors',
    fair: fair
    location: location

module.exports.events = (req, res, next) ->
  return next() unless fair = res.locals.fair
  fairEvents = new FairEvents [], { fairId: fair.id }
  params = { size: 50 }

  # le SIGH
  if res.locals.fair.id is 'the-armory-show-2016'
    params = _.extend(params, { fair_event_group_id: '56c21fcecd530e66dc00007f' })

  fairEvents.fetchUntilEndInParallel
    url: "#{sd.API_URL}/api/v1/fair/#{fair.get('id')}/fair_events"
    data: params
    success: ->
      eventsByDay = fairEvents.groupByDay()
      dates = _.keys(eventsByDay).sort()
      res.locals.sd.DATES = dates
      res.render 'events',
        days: fairEvents.getEventDays dates
        eventsByDay: eventsByDay
        fair: fair
        id: req.params.id

module.exports.singleEvent = (req, res, next) ->
  return next() unless fair = res.locals.fair
  fairEvent = new FairEvent
    id: req.params.eventId
    fair: fair
    profileId: req.params.id
  fairEvent.fetch
    error: res.backboneError
    success: ->
      res.render 'event',
        event: fairEvent

module.exports.addEventToCalendar = (req, res, next) ->
  return next() unless fair = res.locals.fair
  fairEvent = new FairEvent
    id: req.params.eventId
    fair: fair
    profileId: req.params.id
  fairEvent.fetch
    error: res.backboneError
    success: ->
      res.writeHead 200,
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': "attachment; filename='#{req.params.eventId}.ics"
      res.end fairEvent.icsCalendarData()

module.exports.infoProgramming = (req, res, next) ->
  fetchArticle('fair_programming_id', req, res, next)

module.exports.atTheFair = (req, res, next) ->
  fetchArticle('fair_artsy_id', req, res, next)

module.exports.aboutFair = (req, res, next) ->
  fetchArticle('fair_about_id', req, res, next)

fetchArticle = (articleParam, req, res, next) ->
  return next() unless fair = res.locals.fair
  articles = new Articles
  articles.fetch
    data:
      "#{articleParam}": fair.get('_id')
      published: true
    error: next
    success: =>
      if articles.length < 1 && articleParam != 'fair_about_id'
        err = new Error('Not Found')
        err.status = 404
        return next(err)

      res.locals.sd.ARTICLE = articles.first().toJSON() if articles.length > 0
      res.render('article', { article: articles.first() })

module.exports.armoryArtsWeek = (req, res, next) ->
  return next() unless fair = res.locals.fair
  fairEvents = new FairEvents [], { fairId: res.locals.fair.id }
  params = { fair_event_group_id: '56c21fdd2a893a579b00010a' }

  fairEvents.fetchUntilEndInParallel
    cache: true
    data: params
    error: res.backboneError
    success: (events) ->
      eventsByDay = fairEvents.groupByDay()
      dates = _.keys(eventsByDay).sort()
      res.locals.sd.DATES = dates
      res.render 'armory_arts_week',
        days: fairEvents.getEventDays dates
        eventsByDay: eventsByDay
        fair: fair
        id: req.params.id

aawMap = require './maps/armory_arts_week_neighborhoods'

module.exports.armoryArtsWeekAll = (req, res, next) ->
  neighborhoods = _.map aawMap, (neighborhood) ->
    _.extend neighborhood, { article: new Article id: neighborhood.id }

  Q.all _.map neighborhoods, (hood) -> hood.article.fetch()
  .then ->
    res.render 'armory_arts_week_all',
      neighborhoods: neighborhoods
  .catch (err) ->
    console.log 'err', err
    next err
  .done()

