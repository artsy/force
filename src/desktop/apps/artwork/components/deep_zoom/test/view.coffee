_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'

DeepZoomView = null
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

IMAGE = {
  "Image": {
    "xmlns": "http://schemas.microsoft.com/deepzoom/2008",
    "Url": "https://d32dm0rphc51dk.cloudfront.net/mdXtd9RvocejrQlrGDkE1g/dztiles/",
    "Format": "jpg",
    "TileSize": 512,
    "Overlap": 0,
    "Size": {
      "Width": 3744,
      "Height": 5112
    }
  }
}

describe 'DeepZoomView', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        OpenSeadragon: OpenSeadragon

      Backbone.$ = $

      DeepZoomView = benv.requireWithJadeify require.resolve('../view'), ['template']

      sinon.stub _, 'defer', (cb) -> cb()
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      $.getScript = (url, cb) -> cb()

      done()

  after ->
    _.defer.restore()
    benv.teardown()

  beforeEach ->
    @view = new DeepZoomView image: IMAGE
    @view.render()

  describe '#render', ->
    it 'renders the template', ->
      html = @view.$el.html()
      html.should.containEql 'slider'
      html.should.containEql 'zoom-in'
      html.should.containEql 'zoom-out'


  describe '#setupSlider', ->
    beforeEach ->
      @view.setupSlider()

    it 'sets up the range element', ->
      @view.slider().should.have.lengthOf 1
      parseFloat @view.slider().attr 'min'
        .should.equal @view.viewer.viewport.getMinZoom()
      parseFloat @view.slider().attr 'max'
        .should.equal @view.viewer.viewport.getMaxZoom()
      parseFloat @view.slider().val()
        .should.equal @view.viewer.viewport.getHomeZoom()

  describe '#onZoom', ->
    beforeEach ->
      @view.onZoom()

    it 'sets the slider value to the value of the current viewport zoom', ->
      parseFloat @view.slider().val()
        .should.equal @view.viewer.viewport.getZoom()

  describe '#zoomBy', ->
    it 'sets the viewport zoom and applies constraints', ->
      @view.zoomBy 1.5
      @view.viewer.viewport.zoomBy.args[0][0].should.equal 1.5
      @view.viewer.viewport.applyConstraints.called.should.be.ok()

  describe '#zoomIn', ->
    it 'zooms by the view\'s zoomPerClick amount when the plus button is clicked', ->
      @view.$('.js-zoom-in').click()
      @view.viewer.viewport.zoomBy.args[0][0].should.equal 1.4

  describe '#zoomOut', ->
    it 'zooms out by the view\'s zoomPerClick amount over 1 when the minus button is clicked', ->
      @view.$('.js-zoom-out').click()
      @view.viewer.viewport.zoomBy.args[0][0].should.equal 0.7142857142857143

  describe '#zoomTo', ->
    it 'sets the zoom level on the OpenSeadragon viewport to a float value of the currentTarget', ->
      e = $.Event()
      e.currentTarget = value: '0.5'
      @view.zoomTo e
      @view.viewer.viewport.zoomTo.args[0][0].should.equal 0.5

  describe '#detectActivity', ->
    beforeEach ->
      @view.detectActivity()

    afterEach ->
      clearTimeout @view.activityTimer

    it 'sets the el focus immediately to active', ->
      @view.$el.data('focus').should.equal 'active'

    it 'sets a timeout of one second up', ->
      @view.activityTimer._idleTimeout.should.equal 1000
