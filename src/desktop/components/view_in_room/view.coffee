_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class ViewInRoom extends Backbone.View
  className: 'view-in-room'

  roomWidth: 6578
  benchRatio: 2.17

  # Should be visually at about 57" from interstitial
  eyeLevel: ->
    0.139 * @roomWidth

  # Should be visually at about 12" from interstitial
  groundLevel: ->
    0.095 * @roomWidth

  relativeMeasurementHeight: ->
    0.0065 * @roomWidth

  events:
    'click .js-view-in-room-close': 'remove'

  # Should provide dimensions AND (img OR imgUrl, imgSelector, positionStyles)
  initialize: ({ @$img, @imgUrl, @imgSelector, @positionStyles, @dimensions }) ->
    $(window).on 'resize.view-in-room', _.throttle(@scale, 100)
    @$sourceImage = $(@imgSelector)

  __render__: ->
    @$el.html template()
    this

  render: ->
    @__render__()
    @removeScrollbar()
    @cacheSelectors()
    @injectImage()

    @$room.imagesLoaded().always =>
      @scaleRoom()
      @scalePlaceholder()
      @scaleMeasurement()
      @transitionIn()

    this

  cacheSelectors: ->
    @$artwork = @$('.js-view-in-room-artwork')
    @$placeholder = @$('.js-view-in-room-placeholder')
    @$room = @$('.js-view-in-room-room')
    @$measurement = @$('.js-view-in-room-measurement')
    @$measurementBar = @$('.js-view-in-room-measurement-bar')

  injectImage: ->
    @$placeholder.add @$artwork
      .attr 'src', if @imgUrl then @imgUrl else @$img.attr 'src'

    # Position exactly where original image was
    if @positionStyles
      @$artwork.css @positionStyles
    else
      @$artwork.css @getRect(@$img)

  getRect: ($el) ->
    _.pick $el[0].getBoundingClientRect(), 'height', 'width', 'top', 'left'

  transitionIn: ->
    @$el.attr 'data-state', 'in'
    if @$img
      @$img.css visibility: 'hidden'
    if @$sourceImage
      @$sourceImage.css visibility: 'hidden'

    artworkTransformCSS = @getRect @$placeholder

    # We need to manually compute in IE < 11
    if navigator.userAgent.match 'MSIE'
      for key in ['top', 'height', 'width']
        artworkTransformCSS[key] = Math.abs artworkTransformCSS[key] * @roomScalingFactor()
      artworkTransformCSS['left'] = Math.floor ($(window).innerWidth() - artworkTransformCSS['width']) / 2

    $('.js-view-in-room-close').css('opacity', 1)

    @$artwork
      .addClass 'is-transition'
      .css artworkTransformCSS
      .one $.support.transition.end, =>
        @$artwork.addClass 'is-notransition'
      .emulateTransitionEnd 750

  transitionOut: ->
    @$el.attr 'data-state', 'out'
    @$artwork
      .removeClass 'is-notransition'
      .css if @positionStyles then @positionStyles else @getReact(@$img)

  scalePlaceholder: ->
    [significantDimension] = @getArtworkDimensions()

    options = if significantDimension > 254
      bottom: "#{@groundLevel() + @relativeMeasurementHeight()}px"
      marginLeft: -(@$placeholder.width() / 2)
      transform: "scale(#{@artworkScalingFactor()})"
      transformOrigin: "50% #{@$placeholder.height()}px 0"

    else
      bottom: "#{@eyeLevel() + @relativeMeasurementHeight()}px"
      marginBottom: -(@$placeholder.height() / 2)
      marginLeft: -(@$placeholder.width() / 2)
      transform: "scale(#{@artworkScalingFactor()})"

    @$placeholder.css options

  scaleRoom: ->
    @$room.css transform: "scale(#{@roomScalingFactor()})"

  scaleArtwork: ->
    @$artwork.css @getRect(@$placeholder)

  scaleMeasurement: ->
    @$measurementBar.css width: "#{@measurementWidth()}"
    @$measurement.css marginTop: "#{@measurementMargin()}px"

  # Called on the throttled window resize event
  scale: =>
    @scaleRoom()
    @scalePlaceholder()
    @scaleArtwork()
    @scaleMeasurement()

  roomScalingFactor: ->
    roomRatio = @$room.width() / @$room.height()
    viewportRatio = @$el.width() / @$el.height()
    direction = if viewportRatio > roomRatio then 'width' else 'height'
    factor = @$el[direction]() / @$room[direction]()
    Math.ceil(factor * 100) / 100

  artworkScalingFactor: ->
    [height, width] = @getArtworkDimensions()
    factor = Math.round(width * @benchRatio) or 1
    scaling = factor / @$placeholder.width()
    Math.round(scaling * 100) / 100

  measurementMargin: ->
    @$el.height() / 1.79 - 27

  measurementWidth: ->
    @$el.height() / 2.42

  # @return [height, width]
  getArtworkDimensions: ->
    @__dimensions__ ?= _.map @dimensions.replace('cm', '').split(' × '), parseFloat

  removeScrollbar: ->
    $('body').css({
      'overflow-y': 'hidden'
    })

  addScrollbar: ->
    $('body').css({
      'overflow-y': 'visible'
    })

  remove: ->
    $('.js-view-in-room-close').remove()
    $(window).off 'resize.view-in-room'
    @transitionOut()
      .one $.support.transition.end, =>
        if @$img
          @$img.css visibility: 'visible'
        if @$sourceImage
          @$sourceImage.css visibility: 'visible'

        @addScrollbar()

        ViewInRoom.__super__.remove.apply this, arguments
        @trigger 'removed'
