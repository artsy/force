_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data
Fair = require '../../../models/fair.coffee'
Articles = require '../../../collections/articles.coffee'
Clock = require '../../../components/auction_clock/view.coffee'
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

  moreArticles: ->
    @articles.fetch
      remove: false
      data:
        author_id: sd.AUTHOR_ID
        published: true
        offset: 10 * (@page += 1)

module.exports.init = ->
  @fair = new Fair sd.FAIR
  @clock = new Clock
    modelName: "Fair"
    model: @fair
    el: $('.fair-organizer-top__countdown__clock')
  @clock.start()
  new FairOrganizerView
    articles: new Articles(sd.ARTICLES)
    el: $('body')