Backbone = require 'backbone'
template = -> require('../../templates/sections/cv.jade') arguments...
sd = require('sharify').data
ArtworkRailView = require '../../../../components/artwork_rail/client/view'
query = require '../../queries/cv'
metaphysics = require '../../../../../lib/metaphysics'
showHelpers = require '../../../../components/show_cell/helpers'
artistHelpers = require '../../view_helpers'

module.exports = class CVView extends Backbone.View

  subViews: []

  initialize: ({ @user, @statuses }) ->
    @listenTo this, 'artist:cv:sync', @render

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
        articles: @statuses.articles
        shows: @statuses.shows || @statuses.cv
    .then ({ artist }) => @trigger 'artist:cv:sync', artist

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

  render: (artist = {}) ->
    artistMetadata = artistHelpers.artistMeta @model.toJSON()
    @$el.html template _.extend { showHelpers, artistMetadata }, artist
    _.defer => @postRender()
    this

  remove: ->
    super
    _.invoke @subViews, 'remove'
