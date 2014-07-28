_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'

class Element
  constructor: ($el) ->
    $el = $($el) unless $el instanceof jQuery
    @$el = $el
    @recalculate()

  recalculate: ->
    @top = @$el.position().top
    @bottom = @top + @$el.outerHeight()

module.exports = class Scroller
  _.extend @prototype, Backbone.Events

  elements: []

  defaults:
    frequency: 100
    $window: $(window)

  constructor: (options = {}) ->
    { @$window, @frequency } = _.defaults options, @defaults
    @viewportHeight = $(document).height()
    @$window.on 'scroll', _.throttle(@onScroll, @frequency)
    @$window.on 'resize', _.throttle(@onResize, @frequency)

  onScroll: =>
    @scrollTop = @$window.scrollTop()
    @trigger 'position', @scrollTop
    for element in @elements
      @detect element

  onResize: =>
    _.invoke @elements, 'recalculate'

  detect: (element) ->
    element.$el.trigger if @scrollTop > element.top
      'scroller:below'
    else
      'scroller:above'
    if @scrollTop >= element.top and @scrollTop <= element.bottom
      unless element.inside
        element.inside = true
        element.$el.trigger 'scroller:enter'
    else
      if element.inside
        element.inside = false
        element.$el.trigger 'scroller:leave'

  listen: ($el) ->
    @elements.push (element = new Element $el)
    $el.imagesLoaded @onResize
    $el

  remove: ->
    @$window.off 'scroll'
