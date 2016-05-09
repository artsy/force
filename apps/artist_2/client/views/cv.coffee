Backbone = require 'backbone'
template = -> require('../../templates/sections/cv.jade') arguments...
sd = require('sharify').data
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'

module.exports = class BiographyView extends Backbone.View

  subViews: []

  initialize: ->
    @listenTo @model.related().shows, 'sync', @render
    @listenTo @model.related().articles, 'sync', @render

    @model.related().shows.fetchUntilEnd()
    @model.related().artworks.fetch(data: size: 15)
    @model.related().articles.fetch
      cache: true
      data: limit: 50

  postRender: ->
    @subViews.push new ArtworkRailView
      $el: @$(".artist-artworks-rail")
      collection: @model.related().artworks
      title: "Works by #{@model.get('name')}"
      viewAllUrl: "#{@model.href()}/works"
      imageHeight: 180

  render: ->
    { shows, articles } = @model.related()
    articles = articles.models
    fairBooths = _.map shows.select (show) ->
      show.isFairBooth()

    soloShows = shows.select (show) ->
      show.isSolo() and not show.isFairBooth()

    groupShows = shows.select (show) ->
      show.isGroup() and not show.isFairBooth()

    unless shows.length || articles.length
      @$el.html "<div class='loading-spinner'></div>"
      return this
    @$el.html template { articles, fairBooths, soloShows, groupShows }
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
