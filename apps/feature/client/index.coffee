_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
Feature         = require '../../../models/feature.coffee'
artworkColumns  = -> require('../../../components/artwork_columns/template.jade') arguments...
setsTemplate    = -> require('../templates/sets.jade') arguments...
artistsTemplate = -> require('../templates/artists.jade') arguments...

module.exports.FeatureView = class FeatureView extends Backbone.View

  initialize: (options) ->
    @model.fetchSets
      success: (sets) =>
        @sets = sets
        @$('.feature-content').append setsTemplate { sets: sets }
        # If we have artworks, we have a sale or auction.
        if @$('.artwork-column').length > 0
          # hide it until we add the artist list (should be fast)
          @$('.artwork-column:first-child').parent().css 'visibiliy', 'hidden'
          set = _.find sets, (set) -> set.get('type') is ('sale artworks' or 'sale auction')
          @renderArtistList set if set

  getArtworksOrderedByArtist: (collection) ->
    collection.comparator = (model) -> model.get('artist')?.sortable_id
    collection.sort()
    collection.models

  renderArtistList: (set) ->
    artworks = @getArtworksOrderedByArtist set.get 'data'

    n = Math.floor artworks.length/2
    n = 1 if n < 1
    lists = _.groupBy(artworks, (a, b) -> Math.floor(b/n))
    artworkGroups = _.toArray(lists)

    # fix uneven lists
    if artworkGroups.length > 2
      artworkGroups[0].push artworkGroups.pop(2)[0]

    @$('.artwork-column:last-of-type').prepend artistsTemplate { artworkGroups: artworkGroups }
    @$('.artwork-column:first-child').parent().css 'visibiliy', 'visible'


module.exports.init = ->

  new FeatureView
    el   : $('#feature')
    model: new Feature sd.FEATURE
