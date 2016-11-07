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
    @$superArticleNavToc = @$('.article-sa-sticky-related-container')
    @$stickyHeader = @$('.article-sa-sticky-header')
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
    if @$superArticleNavToc.hasClass('visible')
      @$superArticleNavToc.css 'max-height', '0px'
      @$superArticleNavToc.removeClass('visible')

  setStickyNav: ->
    @$stickyHeader.hover =>
      return if window.matchMedia('(max-width: 900px)').matches
      return if @$superArticleNavToc.hasClass('visible')
      @$superArticleNavToc.css 'max-height', 500
      @$superArticleNavToc.addClass 'visible'
    , =>
      return if window.matchMedia('(max-width: 900px)').matches
      @$superArticleNavToc.css 'max-height', '0px'
      @$superArticleNavToc.removeClass('visible')

    return if window.matchMedia('(max-width: 900px)').matches
    initCarousel @$('.article-sa-sticky-related-container'),
      imagesLoaded: true
      wrapAround: true
      advanceBy: 1

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
      @$superArticleNavToc.css 'max-height', '0px'
      @$content.css 'transform', "translate3d(0, 0, 0)"
    else
      $related = @$superArticleNavToc.find('.article-sa-related')
      height = $related.height() * $related.length
      console.log height
      @$superArticleNavToc.css 'max-height', height
      @$body.addClass 'is-open'
      @$content.css 'transform', "translate3d(0, #{height}px, 0)"
