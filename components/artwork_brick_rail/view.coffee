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
      @imageHeight = 220,
      @railId,
      @artworks,
      @includeContact = true
      @hasContext
    } = options

  render: ->
    @$el.html template
      artworks: @artworks
      title: @title
      viewAllUrl: @viewAllUrl
      imageHeight: @imageHeight
      railId: @railId
      includeContact: @includeContact
      hasContext: @hasContext

    @postRender()
    this

  postRender: ->
    initCarousel @$('.js-my-carousel'),
      imagesLoaded: true
      wrapAround: false
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
