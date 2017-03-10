_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('../../templates/sections/shows.jade') arguments...
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
showHelpers = require '../../../../components/show_cell/helpers.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
query = require '../../queries/shows.coffee'

module.exports = class ShowsView extends Backbone.View
  subViews: []

  initialize: ->
    @listenTo this, 'artist:shows:sync', @render

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
    .then ({ artist }) => @trigger 'artist:shows:sync', artist

  postRender: ->
    @subViews.push rail = new ArtworkRailView
      $el: @$(".artist-artworks-rail")
      collection: @model.related().artworks
      title: "Works by #{@model.get('name')}"
      viewAllUrl: "#{@model.href()}/works"
      imageHeight: 180
      totalArtworksCount: @model.get('counts').artworks
      viewAllCell: true

    rail.collection.trigger 'sync'
    @fadeInSection $('#artist-related-shows-section')

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'

  render: (artist) ->
    @$el.html template _.extend { showHelpers }, artist
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
    super
