_ = require 'underscore'
Backbone = require 'backbone'
initCarousel = require '../../merry_go_round/horizontal_nav_mgr.coffee'
sd = require('sharify').data

module.exports = class SuperArticleView extends Backbone.View

  initialize: (options) ->
    { @article } = options

    @$window = $(window)
    @$body = $('body')
    @$superArticleNavToc = $('.article-sa-sticky-related-container')
    @$stickyHeader = $('.article-sa-sticky-header')

    @setupSuperArticle()

    $('.js-article-sa-sticky-hamburger').on 'click', @toggleHamburgerNav

  setupSuperArticle: ->
    @setStickyNav()
    @setWaypoints()

    # Throttle scroll and resize
    throttledScroll = _.throttle((=> @onScroll()), 100)
    throttledResize = _.throttle((=> @setStickyNav()),
     100)
    @$window.on 'scroll', throttledScroll
    @$window.on 'resize', throttledResize

  onScroll: ->
    @hideNav() if @$superArticleNavToc.hasClass('visible')

  hideNav: ->
    @$superArticleNavToc.css 'height', '0px'
    @$superArticleNavToc.removeClass('visible')
    @$body.removeClass 'is-open'

  setStickyNav: =>
    if window.matchMedia('(max-width: 900px)').matches
      @carousel?.navigation.flickity.destroy()
      @$stickyHeader.unbind 'mouseenter mouseleave'
      @hideNav()
    else
      @$stickyHeader.hover =>
        return if @$superArticleNavToc.hasClass('visible')
        height = @$('.article-sa-sticky-related-container .mgr-cells').outerHeight()
        @$superArticleNavToc.css 'height', height
        @$superArticleNavToc.addClass 'visible'
      , =>
        @hideNav()

      @$body.removeClass 'is-open'
      initCarousel @$('.article-sa-sticky-related-container'),
        imagesLoaded: true
        wrapAround: true
        advanceBy: 1
        cellAlign: 'left'
      , (carousel) =>
        # Wait for the callback to set carousel
        @carousel = carousel

  setWaypoints: ->
    return unless @$stickyHeader.length

    # HACK: `globalClientSetup` which requires this library is somehow being
    # called *after* this view method, causing this to error.
    require("jquery-waypoints/waypoints.js")

    @$(".article-content").waypoint (direction) =>
      if direction == 'down'
        @$stickyHeader.addClass 'visible'
      else unless @$stickyHeader.hasClass('no-transition')
        @$stickyHeader.removeClass 'visible'

  toggleHamburgerNav: =>
    if @$body.hasClass 'is-open'
      @hideNav()
    else
      @$superArticleNavToc.css 'height', '100vh'
      @$body.addClass 'is-open'
