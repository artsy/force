Backbone = require 'backbone'
template = -> require('../../templates/sections/cv.jade') arguments...
sd = require('sharify').data

module.exports = class BiographyView extends Backbone.View

  initialize: ->
    @listenTo @model.related().shows, 'sync', @render
    @listenTo @model.related().articles, 'sync', @render

    @model.related().shows.fetchUntilEnd()

    @model.related().articles.fetch
      cache: true
      data: limit: 50

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
    this
