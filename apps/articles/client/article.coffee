Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
ArticleView = require '../../../components/article/view.coffee'

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

    new ArticleView
      el: $('body')
      article: @article

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
    for article in response.results
      tempArticle = new ArticleView
        el: $('#articles-body-container')
        article: new Article article
      tempArticle.renderSelf $('#articles-body-container')

  nextPage: =>
    @params.set offset: (@params.get('offset') + 10) or 0

module.exports.init = ->
  new ArticleIndexView
    el: $('body')
