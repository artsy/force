_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
{ crop } = require '../resizer/index.coffee'

module.exports = class RelatedShowsView extends Backbone.View
  maxShows: 8

  initialize: ->
    @fetchThenRender()

  fetchThenRender: ->
    @listenTo @collection, 'sync', @render
    @collection.comparator = (s) -> - s.getSortValue()

    @collection.fetch()

  render: ->
    shows = @filterShows @collection
    if shows.length
      @$el.show()
      _.defer =>
        @$el.
          addClass('is-fade-in').
          html template
            header: "Shows including #{@model.get('name')}"
            shows: shows[...@maxShows]
            crop: crop
      @
    else
      @remove()

  # Filters out shows w/o images and closed shows in a fair
  filterShows: (collection) ->
    collection.filter (show) ->
      show.thumbImageUrl()?.length > 0 && show.get('displayable') && !(show.get('status') == 'closed' && show.get('fair'))
