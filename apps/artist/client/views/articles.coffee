_ = require 'underscore'
Backbone = require 'backbone'
RelatedPostsView = require '../../../../components/related_posts/view.coffee'
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
template = -> require('../../templates/sections/articles.jade') arguments...
template2 = -> require('../../templates/sections/articles2.jade') arguments...
sd = require('sharify').data

class ArticlesView extends Backbone.View

  subViews: []

  initialize: ->
    @listenTo @model.related().webArticles, 'sync', @render
    @listenTo @model.related().posts, 'sync', @render

    @model.related().posts.fetch(data: size: 20)
    @model.related().webArticles.fetch()

  postRender: ->
    relatedPostsView = new RelatedPostsView collection: @model.related().posts, numToShow: 4
    @$('#artist-page-related-posts-section').html relatedPostsView.render().$el
    @subViews.push relatedPostsView

  render: ->
    @$el.html template(artist: @model, articles: @model.related().webArticles.models)
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'

class ArticlesView2 extends Backbone.View

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
    @$('#artist-page-related-posts-section').html(
      relatedArticlesView.render().$el
    )
    @subViews.push relatedArticlesView

  render: ->
    @$el.html template2
      artist: @model
      articles: @model.related().articles.models
      webArticles: @model.related().webArticles.models
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'

module.exports = if 'Articles' in (sd.CURRENT_USER?.lab_features or []) then ArticlesView2 else ArticlesView
