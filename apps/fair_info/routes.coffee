_ = require 'underscore'
Fair = require '../../models/fair'
FairEvent = require '../../models/fair_event'
FairEvents = require '../../collections/fair_events'
Q = require 'bluebird-q'
embedVideo = require 'embed-video'
{ resize } = require '../../components/resizer/index.coffee'
InfoMenu = require './info_menu.coffee'
Articles = require '../../collections/articles'

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

@visitors = (req, res) ->
  res.render("visitors")

@programming = (req, res, next) ->
  fetchArticle('fair_programming_id', req, res, next)

@events = (req, res) ->
  events = new FairEvents [], {fairId: res.locals.fair.id}

  events.fetch
    cache: true
    error: res.backboneError
    success: ->
      res.locals.sd.FAIR_EVENTS = events.toJSON()
      res.render('events', { fairEvents: events, sortedEvents: events.sortedEvents() })

@atTheFair = (req, res, next) ->
  fetchArticle('fair_artsy_id', req, res, next)

@aboutFair = (req, res, next) ->
  fetchArticle('fair_about_id', req, res, next)

fetchArticle = (articleParam, req, res, next) ->
  articles = new Articles

  articles.fetch
    data:
      "#{articleParam}": res.locals.sd.FAIR._id
      published: true
    error: next
    success: =>
      if articles.length < 1 && articleParam != 'fair_about_id'
        err = new Error('Not Found')
        err.status = 404
        next err

      res.locals.sd.ARTICLE = articles.first().toJSON() if articles.length > 0

      res.render('article', { embedVideo: embedVideo, resize: resize, article: articles.first() })