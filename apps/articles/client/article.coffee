Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
ArticleView = require '../../../components/article/view.coffee'
{ resize } = require '../../../components/resizer/index.coffee'
articleTemplate = -> require('../../../components/article/templates/index.jade') arguments...

module.exports = class ArticleIndexView extends Backbone.View

  initialize: (options) ->
    @params = new Backbone.Model
      author_id: '503f86e462d56000020002cc'
      published: true
      tier: 1
      sort: '-published_at'

    @article = new Article sd.ARTICLE
    @collection = new Articles
      cache: true
      data: @params.toJSON()

    # Main Article
    new ArticleView
      el: $('body')
      article: @article

    if sd.SCROLL_SHARE_ARTICLE.indexOf('infinite') >= 0
      @listenTo @collection, 'sync', @render

      @listenTo @params, 'change:offset', =>
        @$('#articles-show').addClass 'is-loading'
        @collection.fetch
          cache: true
          remove: false
          data: @params.toJSON()
          complete: => @$('#articles-show').removeClass 'is-loading'

      $.onInfiniteScroll(@nextPage)

  render: (collection, response) =>
    articles = _.reject response.results, (a) => a.id is @article.id
    for article in articles
      article = new Article article
      $("#articles-body-container").append articleTemplate
        article: article
        sd: sd
        resize: resize
      $(".article-container[data-id=#{article.get('id')}]").waypoint (direction) ->
        window.history.pushState({}, article.get('id'), article.href()) if direction is 'down'
      feedArticle = new ArticleView
        el: $(".article-container[data-id=#{article.get('id')}]")
        article: article
        gradient: true

  nextPage: =>
    @params.set offset: (@params.get('offset') + 10) or 0

module.exports.init = ->
  new ArticleIndexView
    el: $('body')
