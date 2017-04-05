_ = require 'underscore'
Backbone = require 'backbone'
ArticleView = require './article'
template = -> require('./templates/index.jade') arguments...
button = -> require('./templates/button.jade') arguments...
empty = -> require('./templates/empty.jade') arguments...

module.exports = class ArticlesFeedView extends Backbone.View
  className: 'articles-feed'

  events:
    'click .js-load-more-articles': 'more'

  articleViews: []

  initialize: ({ @fetchWith } = {}) ->
    @renderOuter = _.once =>
      @$el.html template(articles: @collection)

    @listenTo @collection, 'sync', @render

  more: (e) ->
    return if @collection.length >= @collection.count

    @$('.js-load-more-articles').attr 'data-state', 'loading'
    if @fetchWith.featured then  @collection.length = @collection.length + 4
    data = _.extend({}, offset: @collection.length, @fetchWith)

    @collection.fetch(remove: false, data: data)
      .then @renderButton

  renderButton: =>
    (@$more ?= @$('.js-articles-feed-more'))
      .html button(articles: @collection)

  renderArticle: (article, options = {}) =>
    article.set rendered: true

    options = _.extend {}, model: article, options
    @articleViews.push view = new ArticleView(options).render()
    view.$el

  renderArticles: ->
    $els = @collection.chain()
      .filter((article) -> _.isUndefined(article.get 'rendered'))
      .map(@renderArticle)
      .value()

    (@$feed ?= @$('.js-articles-feed-articles'))
      .append (if $els.length then $els else @renderEmpty())

  renderEmpty: ->
    return if @articleViews.length
    empty()

  render: ->
    @renderOuter()
    @renderArticles()
    this

  remove: ->
    _.invoke @articleViews, 'remove'
    super
