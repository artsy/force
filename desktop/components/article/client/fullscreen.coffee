_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class FullscreenView extends Backbone.View

  initialize: (options) ->
    { @article, header } = options
    @$window = $(window)
    @setupArticleWaypoints()
    @duration = 500

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
