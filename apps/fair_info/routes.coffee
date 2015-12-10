_ = require 'underscore'
Fair = require '../../models/fair'
FairEvent = require '../../models/fair_event'
FairEvents = require '../../collections/fair_events'

@assignFair = (req, res, next) ->
  return next() unless res.locals.profile?.isFair()
  fair = new Fair id: res.locals.profile.get('owner').id
  fair.fetch
    cache: true
    error: res.backboneError
    success: ->
      res.locals.fair = fair
      res.locals.sd.FAIR = fair.toJSON()
      next()

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
      res.render('events', { fairEvents: events, sortedEvents: events.sortedEvents() })
