_ = require 'underscore'
Fair = require '../../models/fair'
FairEvent = require '../../models/fair_event'
FairEvents = require '../../collections/fair_events'
Q = require 'bluebird-q'
InfoMenu = require './info_menu.coffee'

@assignFair = (req, res, next) ->
  return next() unless res.locals.profile?.isFair()
  fair = new Fair id: res.locals.profile.get('owner').id
  infoMenu = new InfoMenu fair: fair
  Q.all([
    fair.fetch(cache: true)
    infoMenu.fetch(cache: true)
  ]).then () ->
    res.locals.fair = fair
    res.locals.infoMenu = infoMenu.infoMenu
    res.locals.sd.FAIR = fair.toJSON()
    next()
  .catch (error) ->
    next()
  .done()

@index = (req, res) ->
  res.render("index")

@visitors = (req, res) ->
  res.render("visitors")

@programming = (req, res) ->
  res.render("programming")

@events = (req, res) ->
  events = new FairEvents [], {fairId: res.locals.fair.id}

  events.fetch
    cache: true
    error: res.backboneError
    success: ->
      res.locals.sd.FAIR_EVENTS = events.toJSON()
      res.render('events', { fairEvents: events, sortedEvents: events.sortedEvents() })
