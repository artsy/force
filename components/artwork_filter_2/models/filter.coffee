Backbone = require 'backbone'
_ = require 'underscore'
query = require '../queries/filter_artworks.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'

module.exports = class ArtworkFilter extends Backbone.Model

  initialize: ({ @params, @artist_id }) ->
    @page = 1
    @size = 9
    @artworks = []
    throw new Error 'Requires a params model' unless @params?

    @params.once 'firstSet', => @fetch true

    _.each @params.whitelisted, (param) =>
      @params.on "change:#{param}", => @fetch true

  fetch: (reset) ->
    return if @get 'isLoading' or (@allFetched() and not reset)

    @page = 1 if reset
    variables = _.extend { @artist_id, @size, @page }, @params.mapped()
    @set isLoading: true
    metaphysics({ query, variables }).then ({ filter_artworks }) =>
      fetchedArtworks = filter_artworks.hits
      @set isLoading: false
      @page++
      if reset
        @artworks = fetchedArtworks
        @total = filter_artworks.total
      else
        @artworks.concat fetchedArtworks
      @trigger 'fetched', { artworks: fetchedArtworks, reset: reset }

  allFetched: ->
    @artworks.length >= @total
