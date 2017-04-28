_ = require 'underscore'
Backbone = require 'backbone'
{ SEADRAGON_URL }  = require('sharify').data
template = -> require('./template.jade') arguments...

getScript = (src, callback) ->
  script = document.createElement 'script'
  script.async = 'async'
  script.src = src
  script.onload = callback if callback
  document.getElementsByTagName('head')[0].appendChild script

module.exports = class DeepZoomView extends Backbone.View
  id: 'deep-zoom'

  events:
    'click #dz-close': 'close'

  render: ->
    if @model.defaultImage().canDeepZoom()
      imageOptions = @model.defaultImage().deepZoomJson()
    else if @model.defaultImage().has('deep_zoom')
      imageOptions = Image: @model.defaultImage().get('deep_zoom').Image
    else
      return;
    @$el.html template

    # Currently using a *very edge* build of OpenSeadragon ganked from
    # https://github.com/openseadragon/openseadragon/pull/369
    # that includes substantially improved touch gesture support.
    #
    # Periodically check in on this to see when it was merged
    # and update the vendored build.
    getScript SEADRAGON_URL, =>
      @viewer = OpenSeadragon
        id: @id
        debugMode: false
        showNavigationControl: false
        immediateRender: false
        useCanvas: true
        constrainDuringPan: false
        blendTime: 0.0
        animationTime: 1.2
        springStiffness: 14.0
        maxZoomPixelRatio: 1.0
        minZoomImageRatio: 0.9
        zoomPerClick: 1.4
        zoomPerScroll: 1.4
        clickDistThreshold: 5
        clickTimeThreshold: 300
        visibilityRatio: 0.9
        tileSources: imageOptions
        error: @close
        gestureSettingsTouch  :
          scrollToZoom: false
          clickToZoom: true
          pinchToZoom: true
          flickEnabled: true
          flickMinSpeed: 20
          flickMomentum: 0.40

      @postRender()

    this

  postRender: ->
    @viewer.addHandler 'tile-drawn', _.once =>
      @$('.loading-spinner').remove()

  close: (e) ->
    @viewer?.destroy()
    @remove()
    false
