require 'openseadragon'
_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...
Transition = require '../../../../components/mixins/transition'

module.exports = class DeepZoomView extends Backbone.View
  className: 'deep-zoom'
  attributes:
    'data-state': 'loading'

  openSeadragon:
    config:
      animationTime: 1.5
      blendTime: 0.0
      constrainDuringPan: true
      debugMode: false
      immediateRender: false
      maxZoomPixelRatio: 1.0
      minZoomImageRatio: 0.9
      showNavigationControl: false
      springStiffness: 15.0
      visibilityRatio: 1
      zoomPerClick: 1.4
      zoomPerScroll: 1.25

  events:
    'click .js-close': 'remove'
    'click .js-zoom-out': 'zoomOut'
    'click .js-zoom-in': 'zoomIn'
    'change .js-slider': -> @zoomTo arguments...
    'mousemove': -> @detectActivity arguments...

  @cache: (selector) -> -> @[selector] ?= @$(selector)

  slider: @cache '.js-slider'

  initialize: ({ @image }) ->
    @zoomTo = _.throttle @__zoomTo__, 50
    @detectActivity = _.throttle @__detectActivity__, 500

    $(window).on 'keyup.deepzoom', @escape

  __detectActivity__: (e) ->
    @$el.attr 'data-focus', 'active'
    clearTimeout @activityTimer
    @activityTimer = setTimeout =>
      @$el.attr 'data-focus', 'inactive'
    , 1000

  onZoom: -> _.defer =>
    @slider().val @viewer.viewport?.getZoom()

  zoomBy: (amount) ->
    @viewer.viewport?.zoomBy amount
    @viewer.viewport?.applyConstraints()

  zoomIn: ->
    @zoomBy @openSeadragon.config.zoomPerClick

  zoomOut: ->
    @zoomBy 1 / @openSeadragon.config.zoomPerClick

  __zoomTo__: (e) ->
    @viewer.viewport.zoomTo parseFloat(e.currentTarget.value)

  render: ->
    @$el.html template

    @viewer = OpenSeadragon _.extend {}, @openSeadragon.config,
      element: @$el[0]
      tileSources: @image
      error: @remove

    @postRender()

    this

  postRender: ->
    @viewer.addHandler 'zoom', _.bind _.throttle(@onZoom, 50), this
    @viewer.addHandler 'tile-drawn', _.once =>
      @$el.attr 'data-state', 'loaded'
      @setupSlider()
      @trigger 'ready'

  setupSlider: ->
    @slider()
      .attr
        min: @viewer.viewport.getMinZoom()
        max: @viewer.viewport.getMaxZoom()
        step: 0.001

      .val @viewer.viewport.getHomeZoom()

  escape: (e) =>
    return unless e.which is 27
    @remove()

  remove: ->
    @viewer?.destroy()
    @viewer = null # Important

    Transition.fade @$el,
      duration: 500
      out: =>
        $(window).off 'keyup.deepzoom', @escape
        DeepZoomView.__super__.remove.apply this, arguments
        @trigger 'removed'
