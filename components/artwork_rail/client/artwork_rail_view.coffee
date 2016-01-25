_ = require 'underscore'
Backbone = require 'backbone'
FillwidthView = require '../../fillwidth_row/view.coffee'
initCarousel = require '../../merry_go_round/index.coffee'
template = -> require('../templates/artwork_rail.jade') arguments...

module.exports = class ArtworkRailView extends Backbone.View
  className: 'arv-container'

  events:
    'click .js-mgr-next': 'next'
    'click .js-mgr-prev': 'prev'

  initialize: ({ @title, @viewAllUrl, @railId })->
    @collection.on 'sync', @render, @

  next: ->
    @carousel.cells.flickity.next(true)

  prev: ->
    @carousel.cells.flickity.previous(true)

  render: ->
    @$el.html template
      artworks: @collection.models
      title: @title
      viewAllUrl: @viewAllUrl
      imageHeight: 220
      railId: @railId

    @postRender()

    return this

  postRender: ->
    @carouselPromise = initCarousel @$('.js-my-carousel'),
      imagesLoaded: true
    , (carousel) =>
      @carousel = carousel

      @cellWidth = @$('.js-mgr-cell')
        .map((i, e) -> $(e).outerWidth(true))
        .get()
        .reduce( (prev, curr) -> prev + curr )

      # if there are no overflowing elements
      console.log "@cellWidth", @cellWidth
      console.log "@$('.js-my-carousel').width()", @$('.js-my-carousel').innerWidth()
      unless @cellWidth > @$('.js-my-carousel').width()
        @$('.arv-carousel-nav').addClass 'is-hidden'
