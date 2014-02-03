_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
FillwidthView = require '../fillwidth_row/view.coffee'
{ Following, FollowButton } = require '../follow_button/index.coffee'

module.exports = class ArtistFillwidthList extends Backbone.View

  initialize: (options) ->
    { @user } = options
    @following = new Following(null, kind: 'artist') if @user
    @

  fetchAndRender: ->
    @$el.html template artists: @collection.models
    @collection.each @renderArtist

  renderArtist: (artist, i) =>
    artist.fetchArtworks data: { size: 10 }, success: (artworks) =>
      $row = @$(".artist-fillwidth-list-item:eq(#{i})")

      # Add fillwidth view
      fillwidthView = new FillwidthView
        artworkCollection: @user?.defaultArtworkCollection()
        doneFetching: true
        collection: artworks
        el: $row.find('.artist-fillwidth-list-artworks')
      fillwidthView.render()

      # Add follow button
      new FollowButton
        el: $row.find('.avant-garde-button-white')
        following: @following
        model: artist
      @following?.syncFollows @collection.pluck('id')

      # After rendering the row do some fillwidth things unique to this layout
      _.defer ->
        fillwidthView.hideFirstRow()
        fillwidthView.removeHiddenItems()