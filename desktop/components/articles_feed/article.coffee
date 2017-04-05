Backbone = require 'backbone'
ShareView = require '../share/view'
template = -> require('./templates/article.jade') arguments...

module.exports = class ArticleFeedArticleView extends Backbone.View
  className: 'articles-feed-item'

  attributes: ->
    'data-tier': @model.get('tier')

  postRender: ->
    @share = new ShareView el: @$('.js-article-figure-share')

  render: ->
    @$el.html template(article: @model)
    @postRender()
    this

  remove: ->
    @share?.remove()
    super
