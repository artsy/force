_ = require 'underscore'

module.exports = ($el, options = {}) ->
  return unless $el.length

  options = _.defaults options, heightBreakOffset: 0, limit: 300, label: 'Read More'

  $el.imagesLoaded =>
    # Optional heightBreakOffset will cause the blurb to expand if height is within a certain
    # range of the limit. Prevents collapsing of elements that are just a few pixels over the limit,
    # but will not affect the max-height for the collapsed state.

    return unless (height = $el.outerHeight()) > (options.limit + options.heightBreakOffset)

    $button = $("<div class='gradient-blurb-read-more-container'><a class='gradient-blurb-read-more' href='#'>#{options.label}</a></div>")

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
