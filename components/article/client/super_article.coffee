_ = require 'underscore'
Backbone = require 'backbone'
initCarousel = require '../../merry_go_round/horizontal_nav_mgr.coffee'

module.exports = class SuperArticleView extends Backbone.View

  events: ->
    'click .js-article-sa-sticky-hamburger' : 'toggleHamburgerNav'

  initialize: (options) ->
    { @article } = options

    @$window = $(window)
    @$body = $('body')
    @$content = $('.article-content')
    @$superArticleNavToc = $('.article-sa-sticky-related-container')
    @$stickyHeader = $('.article-sa-sticky-header')
    @duration = 500

    @setupSuperArticle()

  setupSuperArticle: ->
    @setStickyNav()
    @setWaypoints()

    # Throttle scroll and resize
    throttledScroll = _.throttle((=> @onScroll()), 100)
    throttledResize = _.throttle((=> @setStickyNav()),
     100)
    @$window.on 'scroll', throttledScroll
    @$window.on 'resize', throttledResize

    @$('footer').hide()

  onScroll: ->
    @hideNav() if @$superArticleNavToc.hasClass('visible')

  hideNav: ->
    @$superArticleNavToc.css 'height', '0px'
    @$superArticleNavToc.removeClass('visible')

  setStickyNav: =>
    if window.matchMedia('(max-width: 900px)').matches
      @carousel?.navigation.flickity.destroy()
      @$stickyHeader.unbind 'mouseenter mouseleave'
    else
      @$stickyHeader.hover =>
        return if @$superArticleNavToc.hasClass('visible')
        height = @$('.article-sa-related').outerHeight()
        @$superArticleNavToc.css 'height', height
        @$superArticleNavToc.addClass 'visible'
      , =>
        @hideNav()

      @$body.removeClass 'is-open'
      initCarousel @$('.article-sa-sticky-related-container'),
        imagesLoaded: true
        wrapAround: true
        advanceBy: 1
      , (carousel) =>
        # Wait for the callback to set carousel
        @carousel = carousel

  setWaypoints: ->
    return unless @$stickyHeader.length

    selector = if $('body').hasClass('body-fullscreen-article') then '.article-content.article-fullscreen-content' else '.article-section-container:first'
    @$(".article-container[data-id=#{@article.get('id')}] #{selector}").waypoint (direction) =>
      if direction == 'down'
        @$stickyHeader.addClass 'visible'
      else unless @$stickyHeader.hasClass('no-transition')
        @$stickyHeader.removeClass 'visible'

  toggleHamburgerNav: ->
    if @$body.hasClass 'is-open'
      @$body.removeClass 'is-open'
      @$superArticleNavToc.css 'height', '0px'
    else
      @$superArticleNavToc.css 'height', '100vh'
      @$body.addClass 'is-open'
