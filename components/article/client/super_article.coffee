_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class SuperArticleView extends Backbone.View

  initialize: (options) ->
    { @article } = options
    @$window = $(window)
    @duration = 500
    @renderSuperArticle()
    @setupWaypoints()

  renderSuperArticle: ->
    @$superArticleNavToc = @$('.article-sa-sticky-center .article-sa-related-container')

    @$('.article-sa-sticky-center .article-sa-sticky-title').hover =>
      return if @$superArticleNavToc.hasClass('visible')
      height = @$superArticleNavToc.find('.article-sa-related').height() + @$('.article-sa-sticky-center').height() + 50
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
      else
        $stickyHeader.removeClass 'visible'
