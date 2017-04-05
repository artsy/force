_ = require 'underscore'
Backbone = require 'backbone'
Scrollbar = require '../scrollbar/index'
template = -> require('./index.jade') arguments...

module.exports = class ViewInRoom extends Backbone.View
  className: 'view-in-room'

  roomWidth: 6578
  benchRatio: 2.17

  # Should be visually at about 57" from interstitial
  eyeLevel: ->
    0.132 * @roomWidth

  # Should be visually at about 12" from interstitial
  groundLevel: ->
    0.095 * @roomWidth

  events:
    'click .js-view-in-room-close': 'remove'

  initialize: ({ @$img, @dimensions }) ->
    $(window).on 'resize.view-in-room', _.throttle(@scale, 100)
    @scrollbar = new Scrollbar

  __render__: ->
    @$el.html template()
    this

  render: ->
    @__render__()
    @scrollbar.disable()
    @cacheSelectors()
    @injectImage()

    @$room.imagesLoaded().always =>
      @scaleRoom()
      @scalePlaceholder()
      @transitionIn()

    this

  cacheSelectors: ->
    @$artwork = @$('.js-view-in-room-artwork')
    @$placeholder = @$('.js-view-in-room-placeholder')
    @$room = @$('.js-view-in-room-room')

  injectImage: ->
    @$placeholder.add @$artwork
      .attr 'src', @$img.attr 'src'

    # Position exactly where original image was
    @$artwork.css @getRect(@$img)

  getRect: ($el) ->
    _.pick $el[0].getBoundingClientRect(), 'height', 'width', 'top', 'left'

  transitionIn: ->
    @$el.attr 'data-state', 'in'
    @$img.css visibility: 'hidden'

    artworkTransformCSS = @getRect @$placeholder

    # We need to manually compute in IE < 11
    if navigator.userAgent.match 'MSIE'
      for key in ['top', 'height', 'width']
        artworkTransformCSS[key] = Math.abs artworkTransformCSS[key] * @roomScalingFactor()
      artworkTransformCSS['left'] = Math.floor ($(window).innerWidth() - artworkTransformCSS['width']) / 2

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
      .css @getRect(@$img)

  scalePlaceholder: ->
    [significantDimension] = @getArtworkDimensions()

    options = if significantDimension > 254
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
    [height, width] = @getArtworkDimensions()
    factor = Math.round(width * @benchRatio) or 1
    scaling = factor / @$placeholder.width()
    Math.round(scaling * 100) / 100

  # @return [height, width]
  getArtworkDimensions: ->
    @__dimensions__ ?= _.map @dimensions.replace('cm', '').split(' × '), parseFloat

  remove: ->
    $(window).off 'resize.view-in-room'
    @transitionOut()
      .one $.support.transition.end, =>
        @$img.css visibility: 'visible'
        @scrollbar.reenable()
        ViewInRoom.__super__.remove.apply this, arguments
        @trigger 'removed'
