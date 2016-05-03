_ = require 'underscore'
Backbone = require 'backbone'
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
template = -> require('../../templates/sections/articles.jade') arguments...
sd = require('sharify').data

module.exports = class ArticlesView extends Backbone.View

  subViews: []

  initialize: ->
    @model.related().articles.fetch()
    @model.related().artworks.fetch(data: size: 15)

  postRender: ->
    @subViews.push new RelatedArticlesView
      el: @$('.artist-page-related-articles')
      collection: @model.related().articles
      numToShow: 4

    @subViews.push new ArtworkRailView
      $el: @$(".artist-artworks-rail")
      collection: @model.related().artworks
      title: "Works by #{@model.get('name')}"
      viewAllUrl: "#{@model.href()}/works"
      imageHeight: 180

  render: ->
    @$el.html template
      artist: @model
      articles: @model.related().articles.models
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
