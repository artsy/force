Backbone = require 'backbone'
FairInfoVisitorsView = require './visitors.coffee'
FairInfoEventsView = require './events.coffee'
initFairLayout = require '../../../components/fair_layout/client/index.coffee'
Fair = require '../../../models/fair.coffee'
FairEvent = require '../../../models/fair_event.coffee'
Profile = require '../../../models/profile.coffee'
Article = require '../../../models/article.coffee'
ArticleView = require '../../../components/article/client/view.coffee'
sd = require('sharify').data

module.exports = class FairInfoRouter extends Backbone.Router

  routes:
    ':id/info' : 'visitors'
    ':id/info/visitors' : 'visitors'
    ':id/info/programming' : 'article'
    ':id/info/events' : 'events'
    ':id/info/armory-arts-week' : 'events'
    ':id/info/artsy-at-the-fair' : 'article'
    ':id/info/about-the-fair' : 'article'

  initialize: ->
    @fair = new Fair sd.FAIR
    initFairLayout
      model: new Profile sd.PROFILE
      fair: @fair

  visitors: ->
    view = new FairInfoVisitorsView
      model: @fair
      el: $('.fair-info2-body')

    view.maybeDisplayMap()

  article: ->
    new ArticleView
      article: new Article(sd.ARTICLE)
      el: $('.fair-info-article')

  events: ->
    new FairInfoEventsView
      model: @fair
      el: $('.fair-info2-events')

module.exports.init = ->
  new FairInfoRouter
  Backbone.history.start({pushState: true})
