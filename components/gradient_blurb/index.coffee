_ = require 'underscore'

module.exports = ($el, options = {}) ->
  return unless $el.length

  options = _.defaults options, limit: 300, label: 'Read More'

  $el.imagesLoaded =>
    return unless (height = $el.outerHeight()) > options.limit

    $button = $("<a class='gradient-blurb-read-more' href='#'>#{options.label}</a>")

    $el
      .addClass 'gradient-blurb'
      .append $button
      .css 'max-height', options.limit

    $button.one 'click', (e) ->
      e.preventDefault()
      $(this).remove()
      $el
        .addClass 'is-expanded'
        .css 'max-height', height
        .on 'transitionend', ->
          $.waypoints 'refresh'
