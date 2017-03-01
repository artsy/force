###
  Component used for revealing masked content via button

  @example
  $contentToMask = $.find '.some-long-div'
  gradient($contentToMask, limit: 175)

  @note
  This component is aliased by `components/reveal`. Q: Should we relocate this
  into there and refactor existing import paths? Technically, this can reveal
  any kind of content, and the gradient is only added as a sensible default.
###

_ = require 'underscore'

module.exports = ($el, options = {}) ->
  return unless $el.length

  options = _.defaults options,
    $button: undefined

    heightBreakOffset: 0
    label: 'Read More'
    limit: 300
    showGradient: true

  $el.imagesLoaded =>
    # Optional heightBreakOffset will cause the blurb to expand if height is
    # within a certain range of the limit. Prevents collapsing of elements that
    # are just a few pixels over the limit, but will not affect the max-height
    # for the collapsed state.

    return unless (height = $el.outerHeight()) > (options.limit + options.heightBreakOffset)

    if options.$button
      $button = options.$button
    else
      $button = $ """
        <div class='gradient-blurb-read-more-container'>
          <a class='gradient-blurb-read-more' href='#'>
            #{options.label}
          </a>
        </div>
      """

    if options.showGradient
      $el.addClass 'mask-gradient'
    else
      $el.addClass 'mask-block'

    $el
      .addClass 'gradient-blurb'
      .append $button
      .css 'max-height', options.limit

    $el[0].addEventListener("transitionend", (e) ->
      if e.propertyName is 'max-height'
        options.onExpand() if options.onExpand
    , false);

    $button.one 'click', (e) ->
      e.preventDefault()
      $(this).remove()
      $el
        .addClass 'is-expanded'
        .css 'max-height', 1000000
      $.waypoints 'refresh'
      options.onClick?()

    options.afterApply?()
