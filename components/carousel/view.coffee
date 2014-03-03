_                = require 'underscore'
Backbone         = require 'backbone'
carouselTemplate = -> require('./template.jade') arguments...

module.exports = class Carousel extends Backbone.View

  className: 'carousel'
  tagName  : 'section'

  events:
    'click .carousel-dot'                         : 'dotClick'
    'click .carousel-figures .carousel-figure'    : 'figureClick'
    'click .carousel-pre-decoys .carousel-figure' : 'leftArrowClick'
    'click .carousel-arrow-left'                  : 'leftArrowClick'
    'click .carousel-post-decoys .carousel-figure': 'rightArrowClick'
    'click .carousel-arrow-right'                 : 'rightArrowClick'

  active: 0
  centerIndex: 0
  firstDecoyPosition: 0
  height: 480
  inTransition: false
  lastDecoyPosition: 0
  length: 0
  minLength: 2
  noDecoys: false
  noTransitions: false
  prefixWidth: 0
  stopPositions: []
  transitionDuration: '0.5s'
  transitionEvents: 'transitionEnd oTransitionEnd msTransitionEnd transitionend webkitTransitionEnd'

  initialize: (options) ->
    imagesLoaded     = require '../../lib/vendor/imagesloaded.js'
    throw 'You must pass a collection' unless @collection?
    @$window = $(window)
    @$document = $(document)
    @length = @collection.length
    @noTransitions = $('html').hasClass('no-csstransitions')
    @height = options.height
    @render()

  render: ->
    figures = @collection.models

    @$el.html(carouselTemplate carouselFigures: figures, height: @height)

    if @length < @minLength
      @$el.empty()
      return @

    preFigures = figures[..]
    postFigures = figures[..]
    center = Math.ceil(@length / 2)

    @$el.addClass('carousel-loading')
    # Start the carousel at the first image
    @setActive 0
    # Store jQuery ref to the track that shifts
    @$track = @$('.carousel-track')
    # When images are loaded, do the math
    if @$el?.imagesLoaded
      @$el.imagesLoaded => @setStops()
    # Ensure the carousel is revealed even if an image gets stuck
    _.delay (=>
      @$el.removeClass('carousel-loading')
      @setStops()
    ), 5000
    @bindEvents()
    @

  # In order to prevent DOM manipulation, the stage has two copies of the figures.
  # For a list of 6 figures (numbered 1 through 6), the rendered list looks like this:
  # [1', 2', 3', 4', 5', 6', 1, 2, 3, 4, 5, 6, 1', 2', 3', 4', 5', 6']
  # When switching from 1 to 6 and 6 to 1, decoys 1' and 6' will provide the illusion without
  # requiring works to be shuffled from the front of the list to the back and vice versa
  # (Thanks to @speednoise!).
  # The decoys and actual figures have three distinct element parents (see template).
  # These lists keep the illusion if all images happen to have portrait orientation and the
  # viewport is large. Another iteration could determine length of the prefix and postfix
  # lists relative to the viewport or based on a param.
  setStops: ->
    # This function breaks tests if it runs
    return if sd.NODE_ENV == 'test'

    # Use a local widths array to help calculate the stored stop positions
    widths = []
    # Must reset these or the throttled resize will use stale values.
    @stopPositions = []
    windowWidth = @$window.width()
    if @$('.carousel-pre-decoys').width() < windowWidth
      @noDecoys = true
      @$('.carousel-pre-decoys, .carousel-post-decoys').hide()
      @prefixWidth = 0
    else
      @noDecoys = false
      @$('.carousel-pre-decoys, .carousel-post-decoys').show()
      @prefixWidth = @$('.carousel-pre-decoys').width()

    totalLefts = @prefixWidth
    @$('.carousel-figures .carousel-figure').each (index, figure) =>
      $fig = $(figure)
      w = $fig.outerWidth(true)
      widths.push w
      @stopPositions.push Math.floor((windowWidth - w) / 2) - (totalLefts)
      totalLefts += w

    # Set up the decoy of the last figure in the first spot
    lastWidth = _.last widths
    @lastDecoyPosition = Math.floor((windowWidth - lastWidth) / 2) - (@prefixWidth - lastWidth)

    # Set up the decoy of the first figure in the last spot
    @firstDecoyPosition = Math.floor((windowWidth - _.first(widths)) / 2) - (totalLefts)

    @shiftCarousel @stopPositions[@active], false
    @$el.removeClass('carousel-loading')


  bindEvents: ->
    # Bind key events to cycle the carousel
    @$document.on "keyup.partner-show-carousel", (event) => @keyUp(event)

    # Update the layout on window resize with a loading spinner while stops
    # are re-calculated
    throttledSetStops = _.throttle (=> @setStops()), 500
    @$window.on "resize.partner-show-carousel", => @$el.addClass('loading')
    @$window.on "resize.partner-show-carousel", throttledSetStops

    # This will release the inTransition blocker when transitions complete
    @$track.on(@transitionEvents, => @inTransition = false)

  releaseEvents: ->
    @$document.off ".partner-show-carousel"
    @$window.off ".partner-show-carousel"
    @$track.off @transitionEvents

  setActive: (index) ->
    @$(".carousel-figures .carousel-figure").removeClass('carousel-active')
    @$(".carousel-dot").removeClass('carousel-active')
    @active = index
    @$(".carousel-figures .carousel-figure:eq(#{@active})").addClass('carousel-active')
    @$(".carousel-dot:eq(#{@active})").addClass('carousel-active')

  shiftCarousel: (stop, animate = true) ->
    # Borrowed from apple and John Ball's write up here http://johnbhall.com/iphone-4s/
    # In order to get the switch from the decoy end caps to make the list circular,
    # the css transition duration needs to be set to zero in javascript (swapping classes doesn't work).
    stop ?= @stopPositions[@active]
    props = {}
    props.left = stop

    # This browser doesn't support CSS3 transitions
    if animate and @noTransitions
      @$track.animate { left: props.left }, 500, => @inTransition = false
      return
    if animate
      duration = @transitionDuration
      @inTransition = true
    else
      duration = '0s'

    _.each ['-webkit-', '-moz-', '-o-', '-ms-', ''], (value, index) =>
      props[value + "transition-duration"] = duration

    @$track.css props

  keyUp: (event) ->
    switch event.keyCode
      # left arrow and the h key
      when 37, 72
        @shiftLeft()
      # right arrow and the l key
      when 39, 76
        @shiftRight()
    false

  shiftLeft: ->
    unless @inTransition
      if @active is 0
        @shiftCarousel(@firstDecoyPosition, false) unless @noDecoys
        @active = @length
      # The decoy illusion requires a separate thread here
      _.defer =>
        @setActive @active - 1
        @shiftCarousel()
    false

  shiftRight: ->
    unless @inTransition
      if @active is @length - 1
        @shiftCarousel(@lastDecoyPosition, false) unless @noDecoys
        @active = -1
      # The decoy illusion requires a separate thread here
      _.defer =>
        @setActive @active + 1
        @shiftCarousel()
    false

  # Shift the carousel on clicks unless the artwork is the currently selected.
  figureClick: (event) ->
    unless @inTransition
      index = $(event.target).parent().data('carousel-figure-index')
      @shiftRight() if index > @active
      @shiftLeft() if index < @active
    false

  # Shift the carousel on clicks unless the artwork is the currently selected.
  dotClick: (event) ->
    unless @inTransition
      @setActive @$(event.target).data('carousel-dot-position')
      @shiftCarousel()
    false

  leftArrowClick: (event) -> @shiftLeft(); return false
  rightArrowClick: (event) -> @shiftRight(); return false
