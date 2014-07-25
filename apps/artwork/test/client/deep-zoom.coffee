_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

Artwork = require '../../../../models/artwork'
OpenSeadragon = ->
  addHandler: sinon.stub()
  viewport:
    getZoom: -> 1
    getMinZoom: -> 0.5
    getMaxZoom: -> 3
    getHomeZoom: -> 1
    zoomBy: sinon.stub()
    zoomTo: sinon.stub()
    applyConstraints: sinon.stub()

describe 'DeepZoomView', ->
  before (done) ->
    @_defer = _.defer
    _.defer = (cb) -> cb()

    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        OpenSeadragon: OpenSeadragon

      Backbone.$ = $
      $.support.transition = { end: 'transitionend' }
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    _.defer = @_defer
    benv.teardown()

  beforeEach (done) ->
    @artwork = new Artwork(fabricate 'artwork')
    @OpenSeadragon = OpenSeadragon()

    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/deep-zoom.jade'), {}, =>
      DeepZoomView = benv.requireWithJadeify resolve(__dirname, '../../client/deep-zoom'), ['template']
      DeepZoomView.__set__ 'getScript', (x, cb) -> cb()

      @view = new DeepZoomView $container: $('body'), artwork: @artwork
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'has a container', ->
      @view.$container.length.should.equal 1

    it 'has an artwork', ->
      @view.artwork.id.should.equal @artwork.id

    it 'creates throttled versions of #_zoomTo and #_detectActivity', ->
      _.isFunction(@view.zoomTo).should.be.ok
      _.isFunction(@view.detectActivity).should.be.ok

  describe '#render', ->
    describe 'when artwork#canDeepZoom is false', ->
      it 'returns without rendering', ->
        @view.postRender = sinon.stub()
        @view.artwork.defaultImage = -> canDeepZoom: -> false
        @view.render()
        @view.postRender.called.should.not.be.ok

    describe 'when artwork#canDeepZoom is true', ->
      beforeEach ->
        @view.postRender = sinon.stub()
        @view.render()

      it 'sets the state of the el to loading', ->
        @view.$el.data('state').should.equal 'loading'

      it 'renders the template', ->
        html = @view.$container.html()
        html.should.containEql 'deep-zoom'
        html.should.containEql 'dz-slider'
        html.should.containEql 'dz-close'

      it 'sets up the OpenSeadragon viewer', ->
        _.isObject(@view.viewer).should.be.ok

      it 'calls #postRender', ->
        @view.postRender.called.should.be.ok

  describe '#setupSlider', ->
    beforeEach ->
      @view.render()

    it 'sets up the range element', ->
      @view.$slider.length.should.equal 1
      parseFloat(@view.$slider.attr('min')).
        should.equal @OpenSeadragon.viewport.getMinZoom()
      parseFloat(@view.$slider.attr('max')).
        should.equal @OpenSeadragon.viewport.getMaxZoom()
      parseFloat(@view.$slider.val()).
        should.equal @OpenSeadragon.viewport.getHomeZoom()

  describe '#onZoom', ->
    beforeEach ->
      @view.render()
      @view.onZoom()

    it 'sets the slider value to the value of the current viewport zoom', ->
      parseFloat(@view.$slider.val()).
        should.equal @OpenSeadragon.viewport.getZoom()

  describe '#zoomBy', ->
    beforeEach ->
      @view.render()

    it 'sets the viewport zoom and applies constraints', ->
      @view.zoomBy (args = 1.5)
      @view.viewer.viewport.zoomBy.args[0][0].should.equal args
      @view.viewer.viewport.applyConstraints.called.should.be.ok

  describe '#zoomIn', ->
    beforeEach ->
      @view.render()

    it 'zooms by the view\'s zoomPerClick amount when the plus button is clicked', ->
      @view.$('.dz-slider-plus').click()
      @view.viewer.viewport.zoomBy.args[0][0].should.equal @view.zoomPerClick

  describe '#zoomOut', ->
    beforeEach ->
      @view.render()

    it 'zooms out by the view\'s zoomPerClick amount over 1 when the minus button is clicked', ->
      @view.$('.dz-slider-minus').click()
      @view.viewer.viewport.zoomBy.args[0][0].should.equal (1 / @view.zoomPerClick)

  describe '#_zoomTo', ->
    beforeEach ->
      @view.render()

    it 'sets the zoom level on the OpenSeadragon viewport to a float value of the currentTarget', ->
      e = $.Event()
      e.currentTarget = { value: '0.5' }
      @view._zoomTo e
      @view.viewer.viewport.zoomTo.args[0][0].should.equal 0.5

  describe '#_detectActivity', ->
    beforeEach ->
      @view.render()
      @view._detectActivity()

    it 'sets the el focus immediately to active', ->
      @view.$el.data('focus').should.equal 'active'

    it 'sets a timeout of one second up', ->
      @view.activityTimer._idleTimeout.should.equal @view.inactiveDuration
