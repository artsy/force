Backbone = require 'backbone'
template = -> require('../../templates/sections/cv.jade') arguments...
sd = require('sharify').data
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
query = require '../../queries/cv.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
showHelpers = require '../../../../components/show_cell/helpers.coffee'
artistHelpers = require '../../view_helpers.coffee'

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
