{ API_URL } = require('sharify').data
{ defer, invoke, extend } = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../../components/artwork_columns/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class SavedArtworksView extends Backbone.View
  subViews: []

  className: 'settings-saved-artworks'

  events:
    'click .js-settings-saved-artworks__more__button': 'nextPage'

  initialize: ({ @user }) ->
    @params = new Backbone.Model
      total_count: true
      private: true
      size: 10
      page: 1
      sort: '-position'
      user_id: @user.id

    @artworks = new Artworks
    @artworks.url = "#{API_URL}/api/v1/collection/saved-artwork/artworks"

    @listenTo @params, 'change:page', @fetch
    @listenTo @artworks, 'request', @indicateLoading
    @listenTo @artworks, 'sync', @render
    @listenTo @artworks, 'sync', @tripInfinite
    @listenTo @artworks, 'sync', @detectEnd

  tripInfinite: ->
    if @params.get('page') is 2
      $.onInfiniteScroll =>
        @nextPage()

  detectEnd: (response) ->
    if response.length is 0
      $(window).off 'infiniteScroll'
      @$('.js-settings-saved-artworks__more__button')
        .remove()

  indicateLoading: ->
    @$('.js-settings-saved-artworks__more__button')
      .attr 'data-state', 'loading'

  fetch: ->
    @artworks.fetch remove: false, data: @params.toJSON()

  nextPage: (e) ->
    e?.preventDefault()
    @params.set page: @params.get('page') + 1

  postRender: -> defer =>
    if @artworkColumnsView?
      @appendToColumns()

    else if @artworks.length
      @artworkColumnsView = new ArtworkColumnsView
        el: @$('.js-settings-saved-artworks__artworks')
        collection: @artworks
        numberOfColumns: 3
        gutterWidth: 30
        allowDuplicates: true
        artworkSize: 'tall'

      @subViews = [
        @artworkColumnsView
      ]

  appendToColumns: ->
    @artworkColumnsView.appendArtworks @artworks.models

  counts: ({ totalCount, length }) ->
    total = parseInt totalCount or 0
    remaining = total - length
    remaining = 0 if remaining < 0

    total: total
    remaining: remaining

  render: ->
    @__artworks__ = @$('.js-settings-saved-artworks__artworks').detach()

    @$el.html template extend {}, @counts(@artworks),
      artworks: @artworks

    if @__artworks__.length
      @$('.js-settings-saved-artworks__artworks')
        .replaceWith @__artworks__

    @postRender()
    this

  remove: ->
    $(window).off 'infiniteScroll'
    invoke @subviews, 'remove'
    super
