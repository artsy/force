_ = require 'underscore'
Backbone = require 'backbone'
mainTemplate = -> require('./templates/main.jade') arguments...
listTemplate = -> require('./templates/list.jade') arguments...
Artists = require '../../collections/artists.coffee'
FillwidthView = require '../fillwidth_row/view.coffee'
{ Following, FollowButton } = require '../follow_button/index.coffee'

module.exports = class ArtistFillwidthList extends Backbone.View
  defaults:
    page: 1
    per: 10

  initialize: (options = {}) ->
    { @user } = options
    { @page, @per } = _.defaults @defaults, options
    @$document = $(document)
    @user?.initializeDefaultArtworkCollection()
    @following = new Following(null, kind: 'artist') if @user
    @

  fetchAndRender: =>
    @$el.html mainTemplate artists: @collection.models
    @collection.each @renderArtist
    @syncFollowsOnAjaxStop()

  appendPage: (col, res) =>
    if res.length < @per
      @$('.artist-fillwidth-list-see-more').hide()
    else
      @$('.avant-garde-button-text').removeClass('is-loading')

    @collection.add artists = new Artists(res)
    @$('.artist-fillwidth-list').append listTemplate artists: artists.models
    artists.each @renderArtist
    @syncFollowsOnAjaxStop()

  renderArtist: (artist, i) =>
    artist.related().artworks.fetch
      data: size: 10
      success: (artworks) =>
        $row = @$(".artist-fillwidth-list-item[data-id=\"#{artist.get('id')}\"]")
        return $row.remove() if artworks.length is 0

        # Add fillwidth view
        fillwidthView = new FillwidthView
          artworkCollection: @user?.defaultArtworkCollection()
          doneFetching: true
          collection: artworks
          el: $row.find('.artist-fillwidth-list-artworks')
        fillwidthView.render()

        # Add follow button
        new FollowButton
          el: $row.find('.plus-follow-button')
          following: @following
          model: artist
          modelName: 'artist'

        # After rendering the row do some fillwidth things unique to this layout
        _.defer ->
          fillwidthView.hideSecondRow()
          fillwidthView.removeHiddenItems()

  syncFollowsOnAjaxStop: ->
    @$document.one 'ajaxStop', =>
      @following?.syncFollows @collection.pluck('id')

  events:
    'click .artist-fillwidth-list-see-more': 'nextPage'

  nextPage: ->
    @$('.avant-garde-button-text').addClass('is-loading')
    @collection.fetch
      remove: false
      data:
        page: @page = @page + 1
        size: @per
      success: @appendPage
