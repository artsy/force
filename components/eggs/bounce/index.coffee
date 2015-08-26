_ = require 'underscore'

class Image
  needsUpdate: true
  useWindowBounds: false

  constructor: (image) ->
    clone = image.cloneNode()

    clone.innerHTML = ''

    $image = $(image)
    @$el = $(clone)
    @$el.addClass('screensaver-image')

    $('.screensaver-container').append(@$el)

    @$el.css('margin-top', $image.css('margin-top'));
    @$el.css('margin-left', $image.css('margin-left'));
    @$el.css('margin-bottom', $image.css('margin-bottom'));
    @$el.css('margin-right', $image.css('margin-right'));

    @$el.css('padding-top', $image.css('padding-top'));
    @$el.css('padding-left', $image.css('padding-left'));
    @$el.css('padding-bottom', $image.css('padding-bottom'));
    @$el.css('padding-right', $image.css('padding-right'));

    @$el.css('border-top', $image.css('border-top'));
    @$el.css('border-left', $image.css('border-left'));
    @$el.css('border-bottom', $image.css('border-bottom'));
    @$el.css('border-right', $image.css('border-right'));

    # Offset to original position
    @offset = $image.offset()
    @$el.offset(@offset)

    # Store width and height
    width = $image.width()
    height = $image.height()
    @size = { width: $image.innerWidth(), height: $image.innerHeight() }
    @$el.width(width)
    @$el.height(height)

    speed = Math.random() * 5 + 2

    # Random angle from 8 - 85 degrees
    piRatio = Math.PI / 180
    degrees = Math.random() * 20 + 35
    radians = degrees * piRatio

    # Get x and y components
    dx = speed * Math.sin(radians)
    dy = speed * Math.cos(radians)

    # Rotate angle 0, 9, 180 or 270 degrees
    dx *= -1 if Math.random() >= 0.5
    dy *= -1 if Math.random() >= 0.5

    @dx = dx
    @dy = dy

  isInsideBox: (elOffset, elSize, parentOffset, parentSize) ->
    return  elOffset.left > parentOffset.left and
      elOffset.top > parentOffset.top and
      elOffset.left + elSize.width < parentOffset.left + parentSize.width and
      elOffset.top + elSize.height < parentOffset.top + parentSize.height

  wrongDirection:(elemMin, elemDimension, parentMin, parentDimension, velo) ->
    return elemMin <= parentMin and velo < 0 or
      elemMin + elemDimension >= parentMin + parentDimension and velo > 0

  move: (documentAttr, windowAttr, ignoreWindowBounds) ->

    checkIfInsideWindow = @needsUpdate or not (@useWindowBounds or ignoreWindowBounds)

    if checkIfInsideWindow
      @useWindowBounds = @isInsideBox(@offset, @size, windowAttr.offset, windowAttr.size)
      @needsUpdate = false

    # If the image is inside the visible area, bounce off the window instead of the document
    useWindow = @useWindowBounds and not ignoreWindowBounds
    attr = if useWindow then windowAttr else  documentAttr
    @dx *= -1 if @wrongDirection(@offset.left, @size.width, windowAttr.offset.left, windowAttr.size.width, @dx)
    @dy *= -1 if @wrongDirection(@offset.top, @size.height, attr.offset.top, attr.size.height, @dy)

    @offset = {
      top : @offset.top += Math.floor(@dy);
      left : @offset.left += Math.floor(@dx);
    }

    @$el.offset(@offset)

class Bounce
  windowIsChanging: false
  active: false
  images: []
  j: 74
  esc: 27

  constructor: ->
    $(document).keydown (e) =>
      if e.ctrlKey and e.shiftKey and e.which is @j
        @start()

  start: ->
    return if @active
    $(document).keydown @endKeydown

    @active = true

    @$window = $(window)

    $body = $('body')

    @setupWindow()

    $document = $(document)
    @documentAttr = {
      size: {
        width: $document.width(),
        height: $document.height()
      },
      offset: {
        left: 0,
        top: 0
      }
    }

    $body.append("<div class='screensaver-container'></div>")
    @$container = $('.screensaver-container')

    $imageElements = $('img, [style*="background-image"]:not(.home-hero-unit)' )

    @images = _.map $imageElements, (image) =>
      new Image(image)

    @active = true

    @$container.fadeTo 400, 1.0, =>
      @loop()

  setupWindow: ->
    @updateWindowInfo()
    windowIsChanging = _.debounce =>
      @windowIsChanging = true
    , 250, 'leading': true, 'trailing': false

    windowDidChange = _.debounce =>
      @updateWindowInfo()
      _.each @images, (image) ->
        image.needsUpdate = true
      @windowIsChanging = false
    , 250

    @$window.scroll(windowIsChanging)
    @$window.scroll(windowDidChange)

    @$window.resize(windowIsChanging)
    @$window.resize(windowDidChange)

  loop:=>
    return if not @active
    @update()
    window.requestAnimationFrame(@loop, @$container)

  update: ->
    _.each @images, (image) =>
      image.move(@documentAttr, @windowAttr, @windowIsChanging)

  endKeydown: (e) =>
    if e.which is @esc
      @end()

  end: ->
    return if not @active

    $(document).unbind 'keydown', @endKeydown

    @$container.fadeOut =>
      @active = false
      @$container.remove()

  updateWindowInfo: ->
    @windowAttr = {
      size: {
        width: @$window.width(),
        height: @$window.height()
      }, offset: {
        top: @$window.scrollTop(),
        left: @$window.scrollLeft()
      }
    }

module.exports = ->
  new Bounce()
