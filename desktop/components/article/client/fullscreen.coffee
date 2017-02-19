_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FullscreenView extends Backbone.View

  events:
    'click .article-fullscreen-down-arrow a': 'scrollPastFullscreenHeader'

  initialize: (options) ->
    { @article, header } = options
    @$window = $(window)
    @setupArticleWaypoints()
    @initFullscreenHeader(header)
    @duration = 500

  initFullscreenHeader: ($header) ->
    @centerFullscreenHeader $header

    @$window.on 'resize', _.debounce (=> @centerFullscreenHeader($header)), 100

    # Show after css modifications are done
    $header.find('.main-layout-container').addClass 'visible'

  centerFullscreenHeader: ($header) ->

    $superArticleArrow = @$('.article-fullscreen-down-arrow')
    $superArticleArrow.css 'top': @$('.article-fullscreen').height() - 100
    $superArticleArrow.show()
    # Center header
    $container = $header.find('.article-fullscreen-text-overlay')
    maxHeight = @$window.height()
    margin = Math.round((maxHeight - $container.height()) / 2)
    minMargin = 158
    if margin < minMargin
      margin = minMargin

      # fix for small screens
      headerHeight = $container.height() + (margin * 2)
      @$('.article-fullscreen, .article-fullscreen-overlay, .article-fullscreen-video-player, .article-fullscreen-image').css 'min-height', headerHeight

    $container.css 'margin-top': "#{margin}px"

  scrollPastFullscreenHeader: ->
    position = @$('.article-fullscreen').height()
    (@$htmlBody ?= $('html, body'))
      .animate { scrollTop: position }, @duration
    false

  setupArticleWaypoints: ->
    $fullscreenVideo = @$('.article-fullscreen')
    return unless $fullscreenVideo.length

    selector = if $('body').hasClass('body-fullscreen-article') then '.article-content.article-fullscreen-content' else '.article-section-container:first'
    @$el.removeClass 'body-header-fixed'
    @$(".article-container[data-id=#{@article.get('id')}] #{selector}").waypoint (direction) =>
      if direction == 'down'
        $fullscreenVideo.addClass 'hidden'
        @$el.addClass('body-header-fixed').removeClass 'body-transparent-header body-transparent-header-white'
      else
        $fullscreenVideo.removeClass 'hidden'
        @$el.removeClass('body-header-fixed').addClass 'body-transparent-header body-transparent-header-white'
