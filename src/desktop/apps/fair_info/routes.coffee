_ = require 'underscore'
Fair = require '../../models/fair'
FairEvent = require '../../models/fair_event'
FairEvents = require '../../collections/fair_events'
Q = require 'bluebird-q'
embed = require 'particle'
{ resize } = require '../../components/resizer/index.coffee'
Article = require '../../models/article'
InfoMenu = require '../../components/info_menu/index.coffee'
Articles = require '../../collections/articles'

@assignFair = (req, res, next) ->
  return next() unless res.locals.profile?.isFair()
  res.locals.sd.PAGE_TYPE = 'fair'
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


@visitors = (req, res) ->
  res.render("visitors")

@programming = (req, res, next) ->
  fetchArticle('fair_programming_id', req, res, next)

@events = (req, res) ->
  events = new FairEvents [], { fairId: res.locals.fair.id }
  params = { size: 50 }

  # le SIGH
  if res.locals.fair.id is 'the-armory-show-2016'
    params = _.extend(params, { fair_event_group_id: '56c21fcecd530e66dc00007f' })

  events.fetch
    cache: true
    data: params
    error: res.backboneError
    success: (events) ->
      res.locals.sd.FAIR_EVENTS = events.toJSON()
      res.render 'events',
        fairEvents: events,
        sortedEvents: events.sortedEvents()

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
        return next err

      res.locals.sd.ARTICLE = articles.first().toJSON() if articles.length > 0

      res.render 'article', {
        embed: embed,
        resize: resize,
        article: articles.first(),
        hideShare: true
      }

@info = (req, res) ->
  res.redirect 'info/visitors'

@armoryArtsWeek = (req, res) ->
  events = new FairEvents [], { fairId: res.locals.fair.id }
  params = { size: 50, fair_event_group_id: '56c21fdd2a893a579b00010a' }

  events.fetch
    cache: true
    data: params
    error: res.backboneError
    success: (events) ->
      res.locals.sd.FAIR_EVENTS = events.toJSON()
      res.render 'armory_arts_week',
        fairEvents: events,
        sortedEvents: events.sortedEvents()

aawMap = require './maps/armory_arts_week_neighborhoods'
@armoryArtsWeekAll = (req, res, next) ->
  neighborhoods = _.map aawMap, (neighborhood) ->
    _.extend neighborhood, { article: new Article id: neighborhood.id }

  Q.all _.map neighborhoods, (hood) -> hood.article.fetch()
  .then ->
    res.render 'armory_arts_week_all',
      neighborhoods: neighborhoods,
      embed: embed,
      resize: resize
  .catch (err) ->
    next err
  .done()


