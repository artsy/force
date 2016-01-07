_ = require 'underscore'
Fair = require '../../models/fair'
FairEvent = require '../../models/fair_event'
FairEvents = require '../../collections/fair_events'
Q = require 'bluebird-q'
embedVideo = require 'embed-video'
InfoMenu = require './info_menu.coffee'
Article = require '../../models/article'

@assignFair = (req, res, next) ->
  return next() unless res.locals.profile?.isFair()
  fair = new Fair res.locals.profile.get('owner')
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
  @article = new Article
  @article.parse = (response) ->
    response.results[0]

  @article.fetch
    data:
      'fair_programming_id': res.locals.sd.FAIR._id
      published: true
    success: ->
      res.locals.sd.ARTICLE = @article.toJSON()
      res.render('programming', embedVideo: embedVideo)

@events = (req, res) ->
  events = new FairEvents [], {fairId: res.locals.fair.id}

  events.fetch
    cache: true
    error: res.backboneError
    success: ->
      res.locals.sd.FAIR_EVENTS = events.toJSON()
      res.render('events', { fairEvents: events, sortedEvents: events.sortedEvents() })
