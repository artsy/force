_ = require 'underscore'
Backbone = require 'backbone'
initCarousel = require '../../merry_go_round/horizontal_nav_mgr.coffee'

module.exports = class SuperArticleView extends Backbone.View

  initialize: (options) ->
    { @article } = options
    @$window = $(window)
    @duration = 500
    @renderSuperArticle()
    @setupWaypoints()
    @navCarousel()

  renderSuperArticle: ->
    @$superArticleNavToc = @$('.article-sa-sticky-center .article-sa-sticky-related-container')

    @$('.article-sa-sticky-center .article-sa-sticky-title').hover =>
      return if @$superArticleNavToc.hasClass('visible')
      height = @$superArticleNavToc.find('.article-sa-sticky-related-container').height() + @$('.article-sa-sticky-center').height() + 50
      debugger
      @$superArticleNavToc.css 'max-height', "#{height}px"
      @$superArticleNavToc.addClass 'visible'

    @$('.article-sa-sticky-header').mouseleave =>
      @$superArticleNavToc.css 'max-height', '0px'
      @$superArticleNavToc.removeClass('visible')

    @$('footer').hide()

    throttledScroll = _.throttle((=> @onSuperArticleScroll()), 100)
    @$window.on 'scroll', throttledScroll

  onSuperArticleScroll: ->
    if @$superArticleNavToc.hasClass('visible')
      @$superArticleNavToc.css 'max-height', '0px'
      @$superArticleNavToc.removeClass('visible')

  setupWaypoints: ->
    $stickyHeader = @$('.article-sa-sticky-header')
    return unless $stickyHeader.length

    selector = if $('body').hasClass('body-fullscreen-article') then '.article-content.article-fullscreen-content' else '.article-section-container:first'
    @$(".article-container[data-id=#{@article.get('id')}] #{selector}").waypoint (direction) =>
      if direction == 'down'
        $stickyHeader.addClass 'visible'
      else unless $stickyHeader.hasClass('no-transition')
        $stickyHeader.removeClass 'visible'

  navCarousel: ->
    initCarousel @$('.article-sa-sticky-related-container'),
      imagesLoaded: true
      wrapAround: true
      groupCells: true
