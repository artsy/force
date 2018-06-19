Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
_ = require 'underscore'
sd = require('sharify').data
query = require '../queries/filter_artworks.coffee'
metaphysics = require '../../../../lib/metaphysics.coffee'

module.exports = class ArtworkFilter extends Backbone.Model

  page: 1
  size: 40
  artworks: []
  reset: true

  initialize: ({ @params, @artist_id }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an aritst id' unless @artist_id?

    @listenToOnce @params, 'firstSet', => @fetch true

    _.each @params.whitelisted, (param) =>
      @listenTo @params, "change:#{param}", => @fetch true

  fetch: (reset) ->
    return if @get 'isLoading'

    if reset
      @set allFetched: false
      @page = 1
    else
      return if @get 'allFetched'

    props = { @artist_id, @size }

    variables = _.extend(
      @params.mapped(),
      props
    )

    req =
      user: CurrentUser.orNull()

    send = { query, variables, req }
    @set isLoading: true
    metaphysics send
      .then ({ filter_artworks }) =>
        fetchedArtworks = filter_artworks.hits
        @page++
        if reset
          @artworks = fetchedArtworks
          @total = filter_artworks.total
        else
          @artworks = @artworks.concat fetchedArtworks

        @set
          page: @page
          total: @total

        @set allFetched: true if @artworks.length >= @total or fetchedArtworks.length is 0
        @trigger 'fetchedArtworks', { artworks: fetchedArtworks, reset: reset }
        @set isLoading: false

      .catch (err) =>
        @set isLoading: false
