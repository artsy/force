Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class BlurbView extends Backbone.View

  initialize: (options) ->
    { @updateOnResize, @lineCount } = options
    @attachEllipsis()
    $(window).on 'resize', => @attachEllipsis() if @updateOnResize

  attachEllipsis: ->
    return unless @$el.length > 0
    return if @seeMoreClicked
    seeMoreSpan =  $('<span class="see-more-blurb">... <a href="#">Show more</a></span>')
    # The six-pixel wiggle room below is dirty, but works. Things like q's or
    # underlines cause the height of 6 lines of text to exceed 6 * line-height
    @$el.dotdotdot
      ellipsis: ''
      after: seeMoreSpan
      height: (@lineCount * parseInt(@$el.css('lineHeight')) + 6)
      wrap: 'word'
      watch: false

    @$el.trigger 'isTruncated', =>
      @$('.see-more-blurb a').click =>
        @detachEllipsis()
        @seeMoreClicked = true
        false

  detachEllipsis: ->
    _.delay (=> @$el.trigger 'destroy'), 260
    $(window).off 'resize'
