Backbone = require 'backbone'
_ = require 'underscore'
query = require '../queries/filter_artworks.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'
Artworks = require '../../../collections/artworks.coffee'

module.exports = class ArtworkFilter extends Backbone.Model

  initialize: ({ @params, @artistID }) ->
    throw new Error 'Requires a params model' unless @params?
    @artworks = new Artworks
    @listenToOnce @params, 'firstSet', @fetchFromBeginning
    _.each @params.whitelisted, (param) =>
      @listenTo @params, "change:#{param}", @fetchFromBeginning

  fetchFromBeginning: ->
    @params.set page: 1
    @fetch().then (artworks) =>
      @artworks.reset artworks

  fetch: ->
    @set state: 'loading'
    variables = _.extend artist_id: @artistID, @params.mapped()
    metaphysics({ query, variables }).then ({ filter_artworks }) ->
      @set state: 'loaded'
      @total = filter_artworks.total
      filter_artworks.hits