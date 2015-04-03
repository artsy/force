_ = require 'underscore'
Backbone = require 'backbone'
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
template = -> require('../../templates/sections/articles.jade') arguments...
sd = require('sharify').data

module.exports = class ArticlesView extends Backbone.View

  subViews: []

  initialize: ->
    @listenTo @model.related().webArticles, 'sync', @render
    @listenTo @model.related().articles, 'sync', @render
    @model.related().articles.fetch()
    @model.related().webArticles.fetch()

  postRender: ->
    relatedArticlesView = new RelatedArticlesView
      collection: @model.related().articles
      numToShow: 4
    @$('#artist-page-related-articles-section').html(
      relatedArticlesView.render().$el
    )
    @subViews.push relatedArticlesView

  render: ->
    @$el.html template
      artist: @model
      articles: @model.related().articles.models
      webArticles: @model.related().webArticles.models
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
