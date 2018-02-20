_ = require 'underscore'
require 'waypoints/lib/jquery.waypoints.js'

module.exports = ($el, options = {}) ->
  return unless $el.length

  options = _.defaults options, limit: 300, label: 'Read More'

  $el.imagesLoaded =>
    return unless (height = $el.outerHeight()) > options.limit
    $button = $("<div class='gradient-blurb-read-more-container'><a class='gradient-blurb-read-more' href='#'>#{options.label}</a></div>")

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
          Waypoint.refreshAll()

    options.afterApply?()
