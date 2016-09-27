_ = require 'underscore'
Backbone = require 'backbone'
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
template = -> require('../../templates/sections/articles.jade') arguments...
sd = require('sharify').data
query = require '../../queries/articles.coffee'
metaphysics = require '../../../../lib/metaphysics.coffee'

module.exports = class ArticlesView extends Backbone.View

  subViews: []

  initialize: ->
    @listenTo this, 'artist:articles:sync', @render

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
    .then ({ artist }) => @trigger 'artist:articles:sync', artist

  postRender: ->
    @subViews.push rail = new ArtworkRailView
      $el: @$(".artist-artworks-rail")
      collection: @model.related().artworks
      title: "Works by #{@model.get('name')}"
      viewAllUrl: "#{@model.href()}/works"
      imageHeight: 180
      totalArtworksCount: @model.get('counts').artworks
      viewAllCell: true

    rail.collection.trigger 'sync'

    $el = @$('#artist-related-articles-section').show()
    _.defer -> $el.addClass 'is-fade-in'

  render: ( { articles, counts } = {} )->
    @$el.html template
      artist: @model
      articles: articles
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
    super
