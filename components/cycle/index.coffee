_ = require 'underscore'

module.exports = class Cycle
  defaults:
    speed: 4000

  frame: 0

  constructor: (options) ->
    { @$el, @selector, @speed } = _.defaults options, @defaults

    if (@$frames = @$el.find @selector).length is 0
      throw new Error 'selector invalid'

    @styles =
      base: opacity: 0, transition: "opacity #{@speed / 2}ms linear"
      active: opacity: 1, zIndex: 2
      deactivating: opacity: 0, zIndex: 1

  start: ->
    @$el.imagesLoaded =>
      @step()
      @interval = setInterval @step, @speed

  stop: ->
    clearInterval @interval

  step: =>
    if @started then @$frames.css(@styles.base) else @started = true

    $deactivate = (@$frames.filter('.is-active') or @$frames.first())
      .removeClass('is-active')
      .addClass('is-deactivating')
      .css @styles.deactivating

    _.delay =>
      $deactivate
        .removeClass('is-deactivating')
        .css @styles.base
    , @speed / 2

    $(@$frames.get @frame)
      .addClass('is-active')
      .css @styles.active

    @frame = if (@frame + 1 < @$frames.length)
      @frame + 1
    else
      0
