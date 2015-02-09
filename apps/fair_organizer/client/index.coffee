_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data
Fair = require '../../../models/fair.coffee'
Articles = require '../../../collections/articles.coffee'
Clock = require '../../../components/clock/view.coffee'
mediator = require '../../../lib/mediator.coffee'
{ resize, crop } = require '../../../components/resizer/index.coffee'
articlesTemplate = -> require('../templates/articles.jade') arguments...

module.exports.FairOrganizerView = class FairOrganizerView extends Backbone.View

  initialize: ({ @articles }) ->
    @page = 0
    @articles.on 'sync', @renderArticles
    @articles.on 'request', @toggleArticlesSpinner

  renderArticles: (articles, res) =>
    if res.results.length is 0
      @$('#fair-organizer-more-articles').hide()
    else
      @toggleArticlesSpinner()
      @$('#fair-organizer-articles').html articlesTemplate
        articles: @articles.models
        crop: crop
        resize: resize
        moment: moment

  toggleArticlesSpinner: =>
    @$('#fair-organizer-more-articles').toggleClass 'is-loading'

  events:
    'click #fair-organizer-more-articles': 'moreArticles'
    'click .fair-organizer-top__notify': 'onGetNotified'

  moreArticles: ->
    @articles.fetch
      remove: false
      data:
        fair_id: sd.FAIR._id
        published: true
        offset: 10 * (@page += 1)

  onGetNotified: ->
    mediator.trigger 'open:auth', mode: 'login'
    false

module.exports.init = ->
  @fair = new Fair sd.FAIR
  # HACK: Hardcode 2015 show dates
  @fair.set
    start_at: '2015-03-05T12:00:00+00:00'
    end_at: '2015-03-08T19:00:00+00:00'
  @clock = new Clock
    modelName: "Fair"
    model: @fair
    el: $('.fair-organizer-top__countdown__clock')
    closedText: 'TBA'
  @clock.start()
  new FairOrganizerView
    articles: new Articles(sd.ARTICLES)
    el: $('body')
