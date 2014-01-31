_ = require 'underscore'
Backbone = require 'backbone'
template = require './template.jade'
FillwidthView = require '../fillwidth_row/view.coffee'
{ Following, FollowButton } = require '../follow_button/index.coffee'

module.exports = class ArtistFillwidthList extends Backbone.View

  initialize: (options) ->
    { @user } = options
    @fetchAndRender()

  fetchAndRender: ->
    @$el.html template artists: @collection.models
    @collection.each @renderArtist

  renderArtist: (artist, i) =>
    artist.fetchArtworks data: { size: 10 }, success: (artworks) =>
      $row = @$(".artist-fillwidth-list-item:nth-child(#{i + 1})")

      # Add fillwidth view
      fillwidthView = new FillwidthView
        artworkCollection: @currentUserArtworkCollection
        doneFetching: true
        collection: artworks
        el: $row.find('.artist-fillwidth-list-artworks')
      fillwidthView.render()

      # Add follow button
      new FollowButton
        el: $row.find('.avant-garde-button-white')
        following: new Following @followArtistCollection, kind: 'artist'
        model: artist

      # After rendering the row do some fillwidth things unique to this layout
      _.defer ->
        fillwidthView.hideFirstRow()
        fillwidthView.removeHiddenItems()