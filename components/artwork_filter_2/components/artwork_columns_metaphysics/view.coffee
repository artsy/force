Backbone = require 'backbone'
_ = require 'underscore'
template = -> require('./template.jade') arguments...
metaphysics = require '../../../../lib/metaphysics.coffee'
ViewHelpers = require '../../view_helpers.coffee'
setupSaveControls = require '../save_artworks/index.coffee'
query = require '../../queries/filter_artworks.coffee'

module.exports = class ArtworkColumnsView extends Backbone.View

  initialize: ({ @params, @artist_id }) ->
    throw new Error 'Requires a params model' unless @params?
    @page = 1
    @size = 9
    @artworks = []
    @listenToOnce @params, 'firstSet', => @fetch true
    setupSaveControls @artworks
    $.onInfiniteScroll @infiniteScroll

    _.each @params.whitelisted, (param) =>
      @listenTo @params, "change:#{param}", => @fetch true

  fetch: (reset) ->
    return if @allFetched() or @isFetching

    if reset
      $.onInfiniteScroll @infiniteScroll
      @page = 1

    variables = _.extend { @artist_id, @page, @size }, @params.mapped()
    isFetching: true

    metaphysics({ query, variables })
      .then ({ filter_artworks }) =>
        fetchedArtworks = filter_artworks.hits
        isFetching: false

        if @page is 1
          @artworks = fetchedArtworks
          @total = filter_artworks.total
        else
          @artworks = @artworks.concat fetchedArtworks

        if @allFetched() || fetchedArtworks.length == 0
          $.destroyInfiniteScroll()
        else
          @page++

        @render()

  allFetched: ->
    @artworks?.length >= @total

  infiniteScroll: =>
    return if @isFetching
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.artwork-column').last()
    @fetch() unless fold < $lastItem.offset()?.top + $lastItem.height()

  render: ->
    artworkColumns = ViewHelpers.groupByColumnsInOrder(@artworks)
    @$el.html template
      artworkColumns: artworkColumns
      ViewHelpers: ViewHelpers
    setupSaveControls @artworks
    this
