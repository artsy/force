_ = require 'underscore'
bootstrap = require '../../../components/layout/bootstrap'
{ seeMoreArtworks } = require '../../../components/show_more_works/index'
sd = require('sharify').data
Backbone = require 'backbone'
Fair = require '../../../models/fair'
exhibitorsTemplate = -> require('../templates/exhibitors.jade') arguments...
artworkColumnTemplate = -> require('../../../components/artwork_columns/artwork.jade') arguments...
artworkColumnsTemplate = -> require('../../../components/artwork_columns/template.jade') arguments...

module.exports.FairExhibitorsView = class FairExhibitorsView extends Backbone.View

  events:
    'click .show-more-works__artworks-slider' : seeMoreArtworks
  initialize: (options) ->
    { @showParams } = options
    @collection.on 'sync', @renderShows
    @setupInfiniteScroll()
    @renderShows()

  setupInfiniteScroll: ->
    if @showParams.partner?
      @$('#fair-exhibitors-spinner').hide()
    else
      $.onInfiniteScroll =>
        @$('#fair-exhibitors-spinner').hide() unless @collection.nextPage(data: @showParams)

  renderShows: =>
    @$('#fair-exhibitors').html exhibitorsTemplate
      shows: @collection
      artworkColumnsTemplate: artworkColumnsTemplate

module.exports.init = ->
  bootstrap()
  shows = new Fair(sd.FAIR).showsFeed
  shows.reset(sd.SHOWS)
  shows.nextCursor = sd.NEXT_CURSOR
  new FairExhibitorsView
    collection: shows
    el: $('body')
    showParams: sd.SHOW_PARAMS
