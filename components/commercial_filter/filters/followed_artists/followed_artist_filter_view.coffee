_ = require 'underscore'
Backbone = require 'backbone'
{ numberFormat } = require 'underscore.string'
template = -> require('./index.jade') arguments...

module.exports = class FollowedArtistsFilterView extends Backbone.View
  className: 'cf-followed_artists cf-filter'
  events:
    "change [type='checkbox']" : 'toggleFollowedArtists'

  initialize: ({ @params, @filter }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires a filter model' unless @filter?

    @listenTo @params, 'change:include_artworks_by_followed_artists', @render
    @listenTo @filter, 'change:followed_artists_total', @render

  toggleFollowedArtists: (e) ->
    currentValue = @params.get('include_artworks_by_followed_artists')?
    @params.set include_artworks_by_followed_artists: !currentValue

  render: ->
    @$el.html template
      count: @filter.get('followed_artists_total')
      selected: @params.get('include_artworks_by_followed_artists')
      numberFormat: numberFormat
      