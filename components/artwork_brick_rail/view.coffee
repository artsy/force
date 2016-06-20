Backbone = require 'backbone'
initCarousel = require '../merry_go_round/horizontal_nav_mgr.coffee'
template = -> require('./templates/index.jade') arguments...

module.exports = class ArtworkBrickRailView extends Backbone.View
  className: 'abrv-container'

  initialize: (options) ->
    {
      @$el,
      @title,
      @viewAllUrl,
      @railId,
      @artworks,
      @includeContact = true,
      @hasContext,
      @followAnnotation
    } = options

  render: ->
    @$el.html template
      artworks: @artworks
      title: @title
      viewAllUrl: @viewAllUrl
      railId: @railId
      includeContact: @includeContact
      hasContext: @hasContext
      followAnnotation: @followAnnotation

    @postRender()
    this

  postRender: ->
    initCarousel @$('.js-my-carousel'),
      imagesLoaded: false
      wrapAround: false
      advanceBy: 4
    , (carousel) =>
      @trigger 'post-render'
      @carousel = carousel

      # Hide arrows if the cells don't fill the carousel width
      @cellWidth = @$('.js-mgr-cell')
        .map (i, e) -> $(e).outerWidth true
        .get()
        .reduce (prev, curr) -> prev + curr

      unless @cellWidth > @$('.js-my-carousel').width()
        @$('.mgr-navigation').addClass 'is-hidden'
