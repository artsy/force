_ = require 'underscore'
Backbone = require 'backbone'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ExhibitionHistoryListView = require './exhibitions.coffee'
template = -> require('../../templates/sections/shows.jade') arguments...

module.exports = class ShowsView extends Backbone.View
  subViews: []

  initialize: ->
    @model.related().shows.fetchUntilEnd()
    @model.related().exhibitions.fetch()

  postRender: ->
    relatedShowsSubView = new RelatedShowsView collection: @model.related().shows, nUp: 3, maxShows: 20
    @subViews.push relatedShowsSubView

    exhibitionHistoryListSubView = new ExhibitionHistoryListView
      collection: @model.related().exhibitions
      group_by: 'start_date'
      filter_by: 'kind'
      filters:
        solo: 'Solo Shows'
        'two-person': 'Two-person Shows'
        group: 'Group Shows'
        screening: 'Screenings'
    @subViews.push exhibitionHistoryListSubView

    @$('#artist-page-content-section').html [
      relatedShowsSubView.render().$el
      exhibitionHistoryListSubView.render().$el
    ]

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
