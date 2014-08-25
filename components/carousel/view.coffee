_ = require 'underscore'
Backbone = require 'backbone'
carouselTemplate = -> require('./template.jade') arguments...

module.exports = class Carousel extends Backbone.View

  className: 'carousel'
  tagName: 'section'

  events:
    'click .carousel-dot': 'dotClick'
    'click .carousel-figures .carousel-figure': 'figureClick'
    'click .carousel-pre-decoys .carousel-figure': 'leftArrowClick'
    'click .carousel-arrow-left': 'leftArrowClick'
    'click .carousel-post-decoys .carousel-figure': 'rightArrowClick'
    'click .carousel-arrow-right': 'rightArrowClick'
    'touchstart .carousel-figures-clip': 'swipeStart'
    'touchend .carousel-figures-clip': 'swipeEnd'

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
    imagesLoaded = require 'imagesloaded'
    throw 'You must pass a collection' unless @collection?
    @$window = $(window)
    @$document = $(document)
    @length = @collection.length
    @noTransitions = $('html').hasClass('no-csstransitions')
    @height = options.height
    @render()

  cacheSelectors: ->
    @$track = @$('.carousel-track')
    @$preDecoys = @$('.carousel-pre-decoys')
    @$postDecoys = @$('.carousel-post-decoys')
    @$decoys = @$preDecoys.add @$postDecoys
    @$figures = @$('.carousel-figures .carousel-figure')
    @$dots = @$('.carousel-dot')

  render: ->
    figures = @collection.models

    @$el.html(carouselTemplate carouselFigures: figures, height: @height)

    if @length < @minLength
      @$el.empty()
      return @

    preFigures = figures[..]
    postFigures = figures[..]
    center = Math.ceil(@length / 2)

    @cacheSelectors()

    @$el.addClass 'carousel-loading'
    # Start the carousel at the first image
    @setActive 0
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
    # This function breaks tests if it runs. It should always be stubbed in tests

    # Use a local widths array to help calculate the stored stop positions
    widths = []
    # Must reset these or the throttled resize will use stale values.
    @stopPositions = []
    windowWidth = @$window.width()
    if @$preDecoys.width() < windowWidth
      @noDecoys = true
      @$decoys.hide()
      @prefixWidth = 0
    else
      @noDecoys = false
      @$decoys.show()
      @prefixWidth = @$preDecoys.width()

    totalLefts = @prefixWidth
    @$figures.each (index, figure) =>
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
    @$el.removeClass 'carousel-loading'


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
    @active = index
    @$figures
      .removeClass('carousel-active')
      .filter(":eq(#{@active})")
      .addClass 'carousel-active'
    @$dots
      .removeClass('carousel-active')
      .filter(":eq(#{@active})")
      .addClass 'carousel-active'

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

  swipeStart: (e) ->
    e.preventDefault()

    # Remove transition delay while swiping
    props = {}
    _.each ['-webkit-', '-moz-', '-o-', '-ms-', ''], (value) =>
      props[value + "transition-duration"] = '0s'
    @$track.css props

    # Follow me while moving!
    @isSwiping = @isDoneSwiping = false
    trackOriginX = @$track.offset().left
    pointerOriginX = e.originalEvent.touches[0]?.pageX or e.pageX
    $('.carousel-figures-clip').on( "touchmove", _.throttle((e) =>
      # Prevent throttled event handler from triggering after `touchend`
      return if @isDoneSwiping

      @isSwiping = true
      pointerX = e.originalEvent.touches[0]?.pageX or e.pageX
      left = trackOriginX + pointerX - pointerOriginX
      @$track.css left: left + 'px'

      # Prevent touchmove event from bubbling up and triggering
      # vertical scrolling of the entire page.
      e.stopPropagation()
    , 30) )

  swipeEnd: (e) ->
    wasSwiping = @isSwiping; @isSwiping = false; @isDoneSwiping = true
    $('.carousel-figures-clip').unbind("touchmove")
    return unless wasSwiping # was tapping

    left = @$track.offset().left

    # If swiping to the left of the first item...
    if (overflow = @stopPositions[0] - left) < 0 # can use a more accurate breakpoint
      left = @firstDecoyPosition - overflow
      @shiftCarousel(left, false)

    # If swiping to the right of the last item...
    else if (overflow = _.last(@stopPositions) - left) > 0 # can use a more accurate breakpoint
      left = @lastDecoyPosition - overflow
      @shiftCarousel(left, false)

    # Scroll to the closest stop position
    _.defer =>
      @setActive @searchClosest(@stopPositions, left)
      @shiftCarousel()

  # Search for the closest stop position to a given target.
  # This assumes the array is desc sorted, e.g. [-1, -2, -4, -5]
  searchClosest: (array, target, leftIndex = 0, rightIndex = array.length - 1) ->
    if leftIndex >= rightIndex # Check adjacent items to get the closest
      if leftIndex > 0 and target > array[leftIndex] and
         array[leftIndex - 1] - target < target - array[leftIndex]
        return leftIndex - 1
      if rightIndex < array.length - 1 and target < array[leftIndex] and
         target - array[leftIndex + 1] < array[leftIndex] - target
        return leftIndex + 1
      return leftIndex

    midIndex = Math.floor((leftIndex + rightIndex) / 2)
    if target > array[midIndex]
      return @searchClosest(array, target, leftIndex, midIndex - 1)
    else if target < array[midIndex]
      return @searchClosest(array, target, midIndex + 1, rightIndex)
    else
      return midIndex
