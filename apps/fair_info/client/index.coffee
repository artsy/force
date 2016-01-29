Backbone = require 'backbone'
FairInfoVisitorsView = require './visitors.coffee'
FairInfoEventsView = require './events.coffee'
initFairLayout = require '../../../components/fair_layout/client/index.coffee'
Fair = require '../../../models/fair.coffee'
FairEvent = require '../../../models/fair_event.coffee'
Profile = require '../../../models/profile.coffee'
Article = require '../../../models/article.coffee'
ArticleView = require '../../../components/article/view.coffee'
FairInfoArticleView = require './article.coffee'
sd = require('sharify').data

module.exports = class FairInfoRouter extends Backbone.Router

  routes:
    ':id/info2' : 'visitors'
    ':id/info2/visitors' : 'visitors'
    ':id/info2/programming' : 'article'
    ':id/info2/events' : 'events'
    ':id/info2/artsy-at-the-fair' : 'article'
    ':id/info2/about-the-fair' : 'article'

  initialize: ->
    @fair = new Fair sd.FAIR
    initFairLayout
      model: new Profile sd.PROFILE
      fair: @fair
    defaultNavLinkIsActive()

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

  defaultNavLinkIsActive = ->
    strLen = sd.CURRENT_PATH.length
    if sd.CURRENT_PATH.substr((strLen - 5), strLen) == 'info2'
      $('.fair-info2-nav a:first-child').addClass('is-active')

module.exports.init = ->
  new FairInfoRouter
  Backbone.history.start({pushState: true})
