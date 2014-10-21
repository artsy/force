_ = require 'underscore'
imagesLoaded = require 'imagesloaded'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class Carousel extends Backbone.View
  className: 'carousel'
  tagName: 'section'

  events:
    'click .carousel-dot': 'dotClick'
    'click .carousel-figures .carousel-figure': 'figureClick'
    'click .carousel-pre-decoys .carousel-figure': 'shiftLeft'
    'click .carousel-arrow-left': 'shiftLeft'
    'click .carousel-post-decoys .carousel-figure': 'shiftRight'
    'click .carousel-arrow-right': 'shiftRight'
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
  prefixWidth: 0
  stopPositions: []
  transitionDuration: '0.5s'

  initialize: (options) ->
    @$window = $(window)
    @$document = $(document)
    @length = @collection?.length or @$('.carousel-figures .carousel-figure').length
    { @height } = options

  cacheSelectors: ->
    @$track = @$('.carousel-track')
    @$preDecoys = @$('.carousel-pre-decoys')
    @$postDecoys = @$('.carousel-post-decoys')
    @$decoys = @$preDecoys.add @$postDecoys
    @$figures = @$('.carousel-figures .carousel-figure')
    @$dots = @$('.carousel-dot')

  postRender: ->
    @cacheSelectors()

    # Start the carousel at the first image
    @setActive 0

    # When images are loaded, do the math
    @$el.imagesLoaded()
      .always(=> @setStops())

    @bindEvents()

  render: ->
    if @length < @minLength
      @$el.empty()
      return this

    @$el
      .addClass('carousel-loading')
      .html template(carouselFigures: @collection.models, height: @height)

    @postRender()

    this

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
    # Use a local widths array to help calculate the stored stop positions
    widths = []
    # Must reset these or the throttled resize will use stale values.
    @stopPositions = []
    windowWidth = @$window.width()

    # The decoys width isn't going to change, so cache it, which helps
    # if we want to externally show and hide the carousel
    @preDecoysWidth ?= @$preDecoys.width()

    if @preDecoysWidth < windowWidth
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
    @$document.on 'keyup.partner-show-carousel', (e) => @keyUp(e)
    # Update the layout on window resize
    throttledSetStops = _.throttle (=> @setStops()), 500
    @$window.on 'resize.partner-show-carousel', throttledSetStops

  releaseEvents: ->
    @$document.off '.partner-show-carousel'
    @$window.off '.partner-show-carousel'

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
    if animate
      duration = @transitionDuration
    else
      duration = '0s'
    @$track.css
      transform: "translateX(#{(stop ?= @stopPositions[@active])}px)"
      transitionDuration: duration

  keyUp: (e) ->
    switch e.keyCode
      # left arrow and the h key
      when 37, 72
        @shiftLeft()
      # right arrow and the l key
      when 39, 76
        @shiftRight()

  shiftLeft: ->
    if @active is 0
      @shiftCarousel(@firstDecoyPosition, false) unless @noDecoys
      @active = @length
    # The decoy illusion requires a separate thread here
    _.defer =>
      @setActive @active - 1
      @shiftCarousel()

  shiftRight: ->
    if @active is @length - 1
      @shiftCarousel(@lastDecoyPosition, false) unless @noDecoys
      @active = -1
    # The decoy illusion requires a separate thread here
    _.defer =>
      @setActive @active + 1
      @shiftCarousel()

  # Shift the carousel on clicks unless the artwork is the currently selected.
  figureClick: (e) ->
    index = $(e.currentTarget).data 'carousel-figure-index'
    @shiftRight() if index > @active
    @shiftLeft() if index < @active

  # Shift the carousel on clicks unless the artwork is the currently selected.
  dotClick: (e) ->
    @setActive @$(e.target).data('carousel-dot-position')
    @shiftCarousel()

  swipeStart: (e) ->
    e.preventDefault()

    # Remove transition delay while swiping
    @$track.css transitionDuration: '0s'

    # Follow me while moving!
    @isSwiping = @isDoneSwiping = false
    trackOriginX = @$track.offset().left
    pointerOriginX = e.originalEvent.touches[0]?.pageX or e.pageX
    $('.carousel-figures-clip').on 'touchmove', _.throttle((e) =>
      # Prevent throttled event handler from triggering after `touchend`
      return if @isDoneSwiping

      @isSwiping = true
      pointerX = e.originalEvent.touches[0]?.pageX or e.pageX
      left = trackOriginX + pointerX - pointerOriginX
      @$track.css transform: "translateX(#{left}px)"

      # Prevent touchmove event from bubbling up and triggering
      # vertical scrolling of the entire page.
      e.stopPropagation()
    , 30)

  swipeEnd: (e) ->
    wasSwiping = @isSwiping; @isSwiping = false; @isDoneSwiping = true
    $('.carousel-figures-clip').unbind 'touchmove'
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
