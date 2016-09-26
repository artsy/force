_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./templates/index.jade') arguments...
button = -> require('./templates/button.jade') arguments...
empty = -> require('./templates/empty.jade') arguments...
figure = -> require('./templates/figure.jade') arguments...

module.exports = class ArticlesGridView extends Backbone.View

  events:
    'click .js-load-more-articles': 'more'

  articles: []

  initialize: ({ @fetchWith, @partner, @header, @hideMore, @article } = {}) ->
    @renderOuter = _.once =>
      # For GPP, remove partner article from collection
      @collection.remove @article
      # For GPP, don't render empty state if there are no articles
      return if @partner and @collection.length is 0
      @$el.html template(articles: @collection, hideMore: @hideMore?, header: @header)
    @listenTo @collection, 'sync', @render

  more: (e) ->
    return if @collection.length >= @collection.count

    @$('.js-load-more-articles').attr 'data-state', 'loading'

    data = _.extend({}, offset: @collection.length, @fetchWith)

    @collection.fetch(remove: false, data: data)
      .then @renderButton

  renderButton: =>
    (@$more ?= @$('.js-articles-grid-more'))
      .html button(articles: @collection)

  renderArticle: (article) =>
    article.set rendered: true

    options = _.extend {}, model: article, options
    articleHref = if (@partner and article.get('partner_channel_id')) then @partner.href() + article.href() else article.href()
    figure
      article: article
      articleHref: articleHref

  renderArticles: ->
    $els = @collection.chain()
      .filter((article) -> _.isUndefined(article.get 'rendered'))
      .map(@renderArticle)
      .value()

    @articles.concat $els

    (@$feed ?= @$('.js-articles-grid-articles'))
      .append (if $els.length then $els else @renderEmpty())

  renderEmpty: ->
    return if @articles.length
    empty()

  render: ->
    @renderOuter()
    @renderArticles()
    this

  remove: ->
    _.invoke @articleViews, 'remove'
    super
