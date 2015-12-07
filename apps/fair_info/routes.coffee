Fair = require '../../models/fair'
FairEvent = require '../../models/fair_event'
# FairEvents = require '../../collections/fair_events'

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
  event = new FairEvent {id: '54e671ad7261693b7e000200'} , {fairId: res.locals.fair.id}

  event.fetch
    cache: true
    error: res.backboneError
    success: ->
      res.locals.fairEvent = event
      res.locals.sd.FAIREVENT = event.toJSON()
      res.render("events")
