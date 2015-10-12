_ = require 'underscore'

module.exports = ($el, options = {}) ->
  return unless $el.length

  options = _.defaults options, limit: 300, label: 'Read More', lineHeight: 27, isArticle: false

  return unless (height = $el.outerHeight()) > options.limit

  $button = $("<a class='gradient-blurb-read-more' href='#'>#{options.label}</a>")

  if options.isArticle
    # Computes the height of the div where the blur should begin
    # based on the line count excluding images and video
    maxTextHeight = options.lineHeight * options.lineCount
    heightLimit = 0
    textHeight = 0
    for section in $el.children()
      if $(section).children().hasClass('article-section-text')
        textHeight = textHeight + $(section).children().height()
      if textHeight >= maxTextHeight
        heightLimit = $(section).children('.article-section-text').position().top + $(section).children('.article-section-text').outerHeight()
        break
    return if textHeight < maxTextHeight
  else
    heightLimit = options.limit

  $el
    .addClass 'gradient-blurb'
    .append $button
    .css 'max-height', heightLimit

  $button.one 'click', (e) ->
    e.preventDefault()
    $(this).remove()
    $el
      .addClass 'is-expanded'
      .css 'max-height', height
      .on 'transitionend', ->
        $.waypoints 'refresh'
