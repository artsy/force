_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'

module.exports = class CarouselView extends Backbone.View
  increment: 2
  active: 0
  events:
    'click .afc-next': 'next'
    'click .afc-prev': 'prev'

  initialize: (options) ->
    @resize = _.debounce @updateValues, 100
    $(window).on 'resize', @resize
    $(document).on 'keyup', (e) => @keyUp(e)

    # Wait for the first image to load before enabling anything
    @$el.imagesLoaded?().progress _.once(@updateValues)

  updateValues: (e) =>
    @$panels ?= @$('.afc-artist')
    @$images ?= @$panels.find('img')
    @$bumpers ?= @$('.afc-next, .afc-prev')

    panelWidth = @$el.width() / @increment
    @positions = _.map @$panels, (panel, i) -> panelWidth * i
    @stopAt = @positions.length - @increment

    @$panels.outerWidth "#{panelWidth}px"
    @$bumpers.height "#{@$images.height()}px"

    @moveToActive(!e?) if e?

  setPosition: ->
    position = if @active is 0
      'start'
    else if @active >= @stopAt
      'end'
    else
      'middle'

    @$el.attr 'data-position', position

  moveToActive: (transition=true) ->
    return @active = 0 if @active < 0 # Beginning
    return @active = @stopAt if @active >= @positions.length # End

    @$el.attr 'data-transitions', transition
    @setPosition()

    (@$track ?= @$('.afc-track')).
      attr('data-state', 'transitioning').
      css('marginLeft', "-#{@positions[@active]}px").
      one($.support.transition.end, =>
        @$track.attr 'data-state', 'transitioned'
      ).emulateTransitionEnd 333

  next: (e) ->
    e?.preventDefault()
    if @active is @$images.length - @increment
      @active -= @$images.length
    @active += @increment
    @moveToActive()

  prev: (e) ->
    e?.preventDefault()
    if @active is 0
      @active = @$images.length
    @active -= @increment
    @moveToActive()

  keyUp: (e) ->
    switch e.keyCode
      # left arrow and the h key
      when 37, 72
        @prev()
      # right arrow and the l key
      when 39, 76
        @next()
