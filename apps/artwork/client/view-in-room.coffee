_ = require 'underscore'
Backbone = require 'backbone'

template = -> require('../templates/view-in-room.jade') arguments...

module.exports = class ViewInRoom extends Backbone.View
  className: 'artwork-view-in-room'
  bodyClasses: 'body-hide-header'

  roomWidth: 6578
  benchRatio: 5.5

  events:
    'click .view-in-room-close': 'return'

  # Should be visually at about 57" from interstitial
  eyeLevel: ->
    0.132 * @roomWidth

  # Should be visually at about 12" from interstitial
  groundLevel: ->
    0.095 * @roomWidth

  initialize: (options) ->
    { @$container, @$img, @artwork } = options

    @$window = $(window)
    @$body = $('body')

    @$window.on 'resize.view-in-room', _.throttle(@scale, 100)

  _render: ->
    @$el.html template(artwork: @artwork)
    @$container.html @$el

  render: ->
    imagesLoaded = require '../../../lib/vendor/imagesloaded.js'

    @adjustViewport()
    @_render()
    @cacheSelectors()
    @injectImage()
    @$room.imagesLoaded().always =>
      @scaleRoom()
      @scalePlaceholder()
      @transitionIn()

  return: ->
    Backbone.history.navigate @artwork.href(), trigger: true, replace: true
    false

  cacheSelectors: ->
    @$artwork = @$('#vir-artwork')
    @$placeholder = @$('#vir-placeholder')
    @$room = @$('.vir-room')

  injectImage: ->
    @$placeholder.add(@$artwork).attr('src', @$img.attr 'src')
    # Position exactly where original image was
    @$artwork.css @getRect(@$img)

  getRect: ($el) ->
    _.pick($el[0].getBoundingClientRect(), 'height', 'width', 'top', 'left')

  transitionIn: ->
    @$el.attr 'data-state', 'in'
    @$img.css visibility: 'hidden'

    artworkTransformCSS = @getRect(@$placeholder)

    # We need to manually compute in IE < 11
    if navigator.userAgent.match('MSIE')
      for key in ['top', 'height', 'width']
        artworkTransformCSS[key] = Math.abs(artworkTransformCSS[key] * @roomScalingFactor())
      artworkTransformCSS['left'] = Math.floor( ($(window).innerWidth() - artworkTransformCSS['width']) / 2)

    @$artwork.
      addClass('is-transition').
      css(artworkTransformCSS).
      one($.support.transition.end, =>
        @$artwork.addClass('is-notransition')
        if @artworkScalingFactor() > 1
          @$artwork.attr 'src',
            @artwork.defaultImage().imageUrlFor(@$artwork.width(), @$artwork.height())
      ).emulateTransitionEnd(750)

  transitionOut: ->
    @$el.attr 'data-state', 'out'
    @$artwork.
      removeClass('is-notransition').
      css @getRect(@$img)

  scalePlaceholder: ->
    [significantDimension] = @getArtworkDimensions()

    options = if significantDimension > 100
      bottom: "#{@groundLevel()}px"
      marginLeft: -(@$placeholder.width() / 2)
      transform: "scale(#{@artworkScalingFactor()})"
      transformOrigin: "50% #{@$placeholder.height()}px 0"
    else
      bottom: "#{@eyeLevel()}px"
      marginBottom: -(@$placeholder.height() / 2)
      marginLeft: -(@$placeholder.width() / 2)
      transform: "scale(#{@artworkScalingFactor()})"

    @$placeholder.css options

  scaleRoom: ->
    @$room.css transform: "scale(#{@roomScalingFactor()})"

  scaleArtwork: ->
    @$artwork.css @getRect(@$placeholder)

  # Called on the throttled window resize event
  scale: =>
    @scaleRoom()
    @scalePlaceholder()
    @scaleArtwork()

  roomScalingFactor: ->
    roomRatio = @$room.width() / @$room.height()
    viewportRatio = @$el.width() / @$el.height()
    direction = if viewportRatio > roomRatio then 'width' else 'height'
    factor = @$el[direction]() / @$room[direction]()
    Math.ceil(factor * 100) / 100

  artworkScalingFactor: ->
    @__artworkFactor__ ?= if @artwork.hasDimension('diameter') and not @artwork.hasDimension('width')
      [diameter] = @getArtworkDimensions()
      Math.round(diameter * @benchRatio)
    else if @artwork.hasDimension('width')
      [height, width] = @getArtworkDimensions()
      Math.round(width * @benchRatio)
    else
      1
    scailing = @__artworkFactor__ / @$placeholder.width()
    Math.round(scailing * 100)/100

  # @return {Array} height, width
  getArtworkDimensions: ->
    @__dimensions__ ?= @artwork.normalizedDimensions()

  adjustViewport: ->
    $('html, body').scrollTop 0
    @$body.addClass @bodyClasses

  remove: ->
    @$window.off 'resize.view-in-room'
    @transitionOut().one $.support.transition.end, =>
      $('.artwork-container').attr style: null # Remove hard-coded height
      @$body.removeClass @bodyClasses
      @$img.css visibility: 'visible'
      ViewInRoom.__super__.remove.apply(@, arguments)
