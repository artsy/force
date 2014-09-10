_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class RelatedShowsView extends Backbone.View
  defaults:
    nUp: 2
    maxShows: 8

  initialize: (options = {}) ->
    { @maxShows, @nUp } = _.defaults options, @defaults
    @listenTo @collection, 'sync', @render
    @collection.comparator = (s) -> -(s.getSortValue())
    @collection.fetch success: @filterShows

  filterShows: (collection, response, options) =>
    xs = collection
      .chain()
      .filter((show) ->
        show.get('displayable') and
        # Remove shows without images
        show.imageUrlForMaxSize()? and
        # Remove closed shows in a fair
        not (show.get('status') is 'closed' and show.get('fair'))
      )
      .take(@maxShows)
      .value()
    @collection.reset xs

  render: ->
    if @collection.length
      @$el.html template(shows: @collection.models, nUp: @nUp)
      this
    else
      @remove()
