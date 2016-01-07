Backbone = require 'backbone'
FairInfoVisitorsView = require './visitors.coffee'
FairInfoProgrammingView = require './programming.coffee'
FairInfoEventsView = require './events.coffee'
initFairLayout = require '../../../components/fair_layout/client/index.coffee'
Fair = require '../../../models/fair.coffee'
FairEvent = require '../../../models/fair_event.coffee'
Profile = require '../../../models/profile.coffee'
Article = require '../../../models/article.coffee'
ArticleView = require '../../../components/article/view.coffee'
sd = require('sharify').data

module.exports = class FairInfoRouter extends Backbone.Router

  routes:
    ':id/info2' : 'visitors'
    ':id/info2/visitors' : 'visitors'
    ':id/info2/programming' : 'programming'
    ':id/info2/events' : 'events'

  initialize: ->
    @fair = new Fair sd.FAIR
    initFairLayout
      model: new Profile sd.PROFILE
      fair: @fair

    # view = new FairInfoVisitorsView
    #   model: @fair
    #   el: $('.fair-info2-body')

    # view.maybeDisplayMap()

  visitors: ->
    view = new FairInfoVisitorsView
      model: @fair
      el: $('.fair-info2-body')

    view.maybeDisplayMap()

  programming: ->
    new FairInfoProgrammingView
      model: @article
      el: $('.fair-info-programming')

    new ArticleView
      article: new Article(sd.ARTICLE)
      el: $('.fair-info-programming')

  events: ->
    new FairInfoEventsView
      model: @fair
      el: $('.fair-info2-events')

module.exports.init = ->
  new FairInfoRouter
  Backbone.history.start({pushState: true})
