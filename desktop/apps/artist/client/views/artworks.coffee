_ = require 'underscore'
Backbone = require 'backbone'
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'

module.exports = class ArtistArtworksView extends Backbone.View
  subViews: []

  postRender: ->
    if @model.related().artworks.length > 0
      rail = new ArtworkRailView
        $el: @$(".artist-artworks-rail")
        collection: @model.related().artworks
        title: "Works by #{@model.get('name')}"
        viewAllUrl: "#{@model.href()}/works"
        imageHeight: 180
        totalArtworksCount: @model.get('counts').artworks
        viewAllCell: true
      @subViews.push rail
      rail.collection.trigger 'sync'
    else
      @$(".artist-artworks-rail").remove()
    this

  remove: ->
    _.invoke @subViews, 'remove'
    super

  render: ->
    _.defer => @postRender()
