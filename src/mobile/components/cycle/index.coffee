_ = require 'underscore'

module.exports = class Cycle
  defaults:
    speed: 4000

  frame: 0

  started: false

  constructor: (options) ->
    { @$el, @selector, @speed } = _.defaults options, @defaults

    if (@$frames = @$el.find @selector).length is 0
      throw new Error 'selector invalid'

    @styles =
      base: transition: "opacity #{@speed / 2}ms linear", zIndex: 1, opacity: 0
      resting: opacity: 0, zIndex: 1
      active: opacity: 1, zIndex: 2

  start: ->
    @$el.imagesLoaded =>
      @$el.addClass 'is-loaded'
      @step()
      @interval = setInterval @step, @speed

  stop: ->
    clearInterval @interval

  step: =>
    if @started
      @$frames.filter('.is-active')
        .removeClass('is-active')
        .css @styles.resting
    else
      @$frames.css(@styles.base)
      @started = true

    $(@$frames.get @frame)
      .addClass('is-active')
      .css @styles.active

    @frame = if (@frame + 1 < @$frames.length)
      @frame + 1
    else
      0
