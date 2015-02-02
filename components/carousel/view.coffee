_ = require 'underscore'
imagesLoaded = require 'imagesloaded'
mediator = require '../../lib/mediator.coffee'
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
  length: 0
  minLength: 2
  noDecoys: false
  stopPositions: []
  transitionDuration: '0.5s'

  defaults:
    height: 480
    hasDimensions: true
    align: 'center'
    offset: 0

  initialize: (options) ->
    @$window = $(window)
    @$document = $(document)
    @length = @collection?.length or @$('.carousel-figures .carousel-figure').length

    { @height, @hasDimensions, @align, @offset } = _.defaults options, @defaults

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
    if @hasDimensions
      @complete()
    else
      @$el.imagesLoaded?()?.always => @complete()

    @bindEvents()

  complete: ->
    @setStops()
    @$el
      .removeClass('is-loading')
      .addClass 'is-done'

    mediator.trigger 'carousel:images:loaded'

  render: ->
    if @length < @minLength
      @$el.empty()
      return this

    @$el
      .addClass('is-loading')
      .html template(carouselFigures: @collection.models, height: @height)

    _.defer => @postRender()

    this

  sum: (arr) ->
    _.reduce arr, ((sum, n) -> n + sum), 0

  widths: ->
    @__widths__ ?= @$figures.map(-> $(this).outerWidth()).get()

  # Calculating a 'left' by aggregating widths, offset by 1 element to the left
  lefts: (offset = 0) ->
    _.map @widths(), (width, i) =>
      -((if i is 0 then 0 else @sum(@widths()[0..(i - 1)])) + offset)

  leftAlignPositioning: (offset = 0) ->
    positions = @lefts(offset)
    {
      stopPositions: positions
      lastDecoyPosition: _.first(positions) + _.last(@widths())
      firstDecoyPosition: _.last(positions) - _.last(@widths())
    }

  centerAlignPositioning: (offset = 0) ->
    windowWidth = @$window.width()
    positions = _.map _.zip(@lefts(offset), @widths()), ([left, width]) ->
      Math.floor((windowWidth - width) / 2) + left
    {
      stopPositions: positions
      lastDecoyPosition: Math.floor((windowWidth - _.last(@widths())) / 2) - (offset - _.last(@widths()))
      firstDecoyPosition: Math.floor((windowWidth - _.first(@widths())) / 2) - (@sum(@widths()) + offset)
    }

  getPositioning: (offset = 0) ->
    @["#{@align}AlignPositioning"](offset + @offset)

  hideDecoys: ->
    @$preDecoys.width() < @$window.width()

  hideDots: ->
    dotWidth = 11 # Can increase to increase sensitivity/threshold
    arrowWidth = 100
    maxDots = Math.floor((@$window.width() - arrowWidth) / dotWidth)
    maxDots < @length

  toggleDots: ->
    @$dots[if @hideDots() then 'hide' else 'show']()

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
    @toggleDots()

    if @hideDecoys()
      @noDecoys = true
      @$decoys.hide()
      offset = 0
    else
      @noDecoys = false
      @$decoys.show()
      offset = @$preDecoys.width()

    { @stopPositions, @lastDecoyPosition, @firstDecoyPosition } = @getPositioning(offset)

    @shiftCarousel @stopPositions[@active], false

  bindEvents: ->
    # Bind key events to cycle the carousel
    @$document.on 'keyup.partner-show-carousel', @keyUp
    # Update the layout on window resize
    throttledSetStops = _.throttle (=> @setStops()), 500
    @$window.on 'resize.partner-show-carousel', throttledSetStops

  setActive: (index) ->
    @active = index
    @$figures
      .removeClass('is-active')
      .filter(":eq(#{@active})")
      .addClass 'is-active'
    @$dots
      .removeClass('is-active')
      .filter(":eq(#{@active})")
      .addClass 'is-active'

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

  keyUp: (e) =>
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

  remove: ->
    @$document.off '.partner-show-carousel'
    @$window.off '.partner-show-carousel'
    super
