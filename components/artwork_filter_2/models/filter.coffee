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
    console.log 'fetch, reset: ', reset
    return if @get 'isLoading'

    if reset
      console.log 'reset'
      @set allFetched: false
      @page = 1
    else
      return if @get 'allFetched'

    variables = _.extend { @artist_id, @size, @page }, @params.mapped()
    send = { query, variables }
    @set isLoading: true
    metaphysics send
      .then ({ filter_artworks }) =>
        console.log filter_artworks.hits.length
        fetchedArtworks = filter_artworks.hits
        @set isLoading: false
        @page++
        if reset
          @artworks = fetchedArtworks
          @total = filter_artworks.total
        else
          debugger
          @artworks = @artworks.concat fetchedArtworks

        console.log @artworks.length, @total
        @set allFetched: true if @artworks.length >= @total or fetchedArtworks.length is 0
        @trigger 'fetched', { artworks: fetchedArtworks, reset: reset }

      .catch (err) =>
        console.log err
        @set isLoading: false
