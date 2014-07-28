_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
Element = require './element.coffee'

module.exports = class Scroller
  _.extend @prototype, Backbone.Events

  elements: []

  defaults:
    frequency: 100
    $window: $(window)
    $document: $(document)

  constructor: (options = {}) ->
    { @$window, @$document, @frequency } = _.defaults options, @defaults
    @viewportHeight = @$document.height()
    @$window.on 'scroll.scroller', _.throttle(@onScroll, @frequency)
    @$window.on 'resize.scroller', _.throttle(@onResize, @frequency)

  onScroll: =>
    @scrollTop = @$window.scrollTop()
    @trigger 'position', @scrollTop
    for element in @elements
      @detect element

  onResize: =>
    _.invoke @elements, 'recalculate'

  detect: (element) ->
    if @scrollTop > element.top
      element.above = false
      unless element.below
        element.below = true
        element.$el.trigger 'scroller:below'
    else
      element.below = false
      unless element.above
        element.above = true
        element.$el.trigger 'scroller:above'
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
    $el = element.$el
    $el.imagesLoaded @onResize
    $el

  remove: ->
    @$window.off 'scroll.scroller'
    @$window.off 'resize.scroller'
    @stopListening()
