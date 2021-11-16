_ = require 'underscore'
Backbone = require 'backbone'
mainTemplate = -> require('./templates/main.jade') arguments...
listTemplate = -> require('./templates/list.jade') arguments...
{ Artists } = require '../../collections/artists'
FillwidthView = require '../fillwidth_row/view.coffee'
{ Following, FollowButton } = require '../follow_button/index'

module.exports = class ArtistFillwidthList extends Backbone.View
  subViews: []

  defaults:
    page: 1
    per: 10
    syncFollows: true

  initialize: (options = {}) ->
    { @user, @following, @context_page, @context_module } = options
    { @page, @per, @syncFollows } = _.defaults @defaults, options
    @$document = $(document)
    @user?.initializeDefaultArtworkCollection()
    @following = new Following(null, kind: 'artist') if @user and not @following?
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
          context_page: @context_page
          context_module: @context_module

        @subViews.push fillwidthView

        fillwidthView.render()

        # Add follow button
        @subViews.push new FollowButton
          el: $row.find('.plus-follow-button')
          following: @following
          model: artist
          modelName: 'artist'
          context_module: "Artist fillwidth row"

        # After rendering the row do some fillwidth things unique to this layout
        _.defer ->
          fillwidthView.hideSecondRow()
          fillwidthView.removeHiddenItems()

  syncFollowsOnAjaxStop: ->
    return if not @syncFollows
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

  remove: ->
    _.invoke @subViews, 'remove'
    super
