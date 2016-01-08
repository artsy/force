_ = require 'underscore'
Fair = require '../../models/fair'
FairEvent = require '../../models/fair_event'
FairEvents = require '../../collections/fair_events'
Q = require 'bluebird-q'
embedVideo = require 'embed-video'
{ resize } = require '../../components/resizer/index.coffee'
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
  @article = new Article
  @article.parse = (response) ->
    response.results[0]

  @article.fetch
    data:
      "#{articleParam}": res.locals.sd.FAIR._id
      published: true
    error: next
    success: ->
      res.locals.sd.ARTICLE = @article.toJSON()
      res.render('article', { embedVideo: embedVideo, resize: resize })