Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class BlurbView extends Backbone.View

  initialize: (options) ->
    { @updateOnResize, @lineCount, @resizeHeight, @includeShowLess } = options
    @resizeHeight = @resizeHeight || @$el.height()
    @attachEllipsis()
    $(window).on 'resize', => @attachEllipsis() if @updateOnResize

    @on 'ellipsis:detached', @displayShowLessAfterDetached

  attachEllipsis: ->
    return unless @$el.length > 0
    return if @seeMoreClicked
    seeMoreSpan = $('<span class="see-more-blurb">&hellip; <a class="faux-underline" href="#">Show more</a></span>')
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
    @$el.trigger('destroy')[0] # Destroy dotdotdot and return the actual height
    @$el.height(@$el.height(@resizeHeight).scrollHeight) # Set the real height (transition happens with CSS)
    $(window).off 'resize'
    @trigger 'ellipsis:detached'

  displayShowLessAfterDetached: ->
    return unless @includeShowLess
    $link = $("<a>", {class: "show-less-blurb"}).html(' Show less')
    @$el.append($link)

    $('a.show-less-blurb').click (e) =>
      e.preventDefault()
      @seeMoreClicked = false
      $('span .see-more-blurb').remove()
      $($link).remove()
      @attachEllipsis()
