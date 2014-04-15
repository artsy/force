_           = require 'underscore'
Backbone    = require 'backbone'
Transition  = require '../../../components/mixins/transition.coffee'
getScript   = require '../../../lib/get_script.coffee'

template = -> require('../templates/deep-zoom.jade') arguments...

module.exports = class DeepZoomView extends Backbone.View
  id: 'deep-zoom'

  zoomPerClick: 1.4

  inactiveDuration: 1000

  events:
    'click .dz-close'         : 'return'
    'click .dz-slider-minus'  : 'zoomOut'
    'click .dz-slider-plus'   : 'zoomIn'
    'change .dz-slider-range' : 'zoomTo'
    'mousemove'               : 'detectActivity'

  initialize: (options) ->
    { @artwork, @$container } = options

    @zoomTo           = _.throttle @_zoomTo, 50
    @detectActivity   = _.throttle @_detectActivity, 500

    (@$window = $(window)).on 'keyup', @escape

  _detectActivity: (e) ->
    @$el.attr 'data-focus', 'active'
    clearTimeout @activityTimer
    @activityTimer = setTimeout (=>
      @$el.attr 'data-focus', 'inactive'
    ), @inactiveDuration

  render: ->
    return unless (image = @artwork.activeImage()).canDeepZoom()

    @$el.html(template).
      attr 'data-state', 'loading'

    @$container.html @$el

    getScript 'openseadragon', =>
      @viewer = OpenSeadragon
        id                    : @id
        debugMode             : false
        showNavigationControl : false
        immediateRender       : false
        blendTime             : 0.0
        animationTime         : 1.5
        springStiffness       : 15.0
        maxZoomPixelRatio     : 1.0
        minZoomImageRatio     : 0.9
        zoomPerClick          : @zoomPerClick
        zoomPerScroll         : 1.1
        constrainDuringPan    : true
        visibilityRatio       : 1
        tileSources           : image.deepZoomJson()
        error                 : @return

      @postRender()

    this

  postRender: ->
    @setupViewer()
    @setupSlider()

  setupSlider: ->
    _.defer =>
      (@$slider = @$('.dz-slider-range')).attr(
        min: @viewer.viewport.getMinZoom()
        max: @viewer.viewport.getMaxZoom()
        step: 0.001
      ).val @viewer.viewport.getHomeZoom()

  setupViewer: ->
    @viewer.addHandler 'tile-drawn', _.once => @$el.attr 'data-state', 'loaded'
    @viewer.addHandler 'zoom', _.bind(_.throttle(@onZoom, 50), this)

  onZoom: ->
    _.defer =>
      @$slider?.val @viewer.viewport?.getZoom()

  zoomBy: (amount) ->
    @viewer.viewport?.zoomBy amount
    @viewer.viewport?.applyConstraints()

  zoomIn: ->
    @zoomBy @zoomPerClick

  zoomOut: ->
    @zoomBy (1 / @zoomPerClick)

  _zoomTo: (e) ->
    @viewer.viewport.zoomTo parseFloat(e.currentTarget.value)

  escape: (e) =>
    return unless e.which is 27
    @return()

  # Close by just returning to the base artwork route
  # The router will call #remove on this view
  return: ->
    Backbone.history.navigate "/artwork/#{@artwork.id}", trigger: true, replace: true

  # Invoked by the router
  remove: ->
    @viewer?.close()

    Transition.fade @$el,
      duration: 500
      out: =>
        @$window.off 'keyup', @escape
        DeepZoomView.__super__.remove.apply(this, arguments)
