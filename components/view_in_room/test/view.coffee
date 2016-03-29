benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artwork = require '../../../models/artwork'
ViewInRoomView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'ViewInRoomView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @artwork = new Artwork fabricate 'artwork', width: 20

    $img = $('<img>')
      .width 200
      .height 200
      .attr 'src', 'foobar.jpg'
      .css
        top: '200px'
        left: '200px'

    @view = new ViewInRoomView
      $img: $img
      artwork: @artwork

    @view.__render__()
    @view.cacheSelectors()

  describe '#injectImage', ->
    beforeEach ->
      @view.injectImage()

    it 'creates two copies of the passed in image', ->
      @view.$placeholder.attr 'src'
        .should.equal @view.$img.attr('src')

      @view.$artwork.attr 'src'
        .should.equal @view.$img.attr('src')

    it 'positions the artwork', ->
      style = @view.$artwork.attr 'style'

      style.should.containEql 'top'
      style.should.containEql 'left'
      style.should.containEql 'width'
      style.should.containEql 'height'

  describe '#roomScalingFactor', ->
    it 'returns a non-zero value to scale the room by', ->
      @view.$room.width 2000
      @view.$room.height 1000
      @view.$el.width = -> 640
      @view.$el.height = -> 480

      @view.roomScalingFactor()
        .should.equal 0.48

    it 'returns a non-zero value to scale the room by', ->
      @view.$room.width 2000
      @view.$room.height 1000
      @view.$el.width = -> 480
      @view.$el.height = -> 640

      @view.roomScalingFactor()
        .should.equal 0.64

  describe '#artworkScalingFactor', ->
    it 'returns a non-zero factor to scale the artwork by', ->
      @view.$placeholder.width(200)
      @view.getArtworkDimensions = -> [20, 20]

      @view.artworkScalingFactor()
        .should.equal 0.55

  describe '#scalePlaceholder', ->
    it 'scales the placeholder and sets it at eye level if the significant dimension is less than 100', ->
      @view.$placeholder.css = sinon.stub()
      @view.scalePlaceholder()

      Object.keys @view.$placeholder.css.args[0][0]
        .should.eql ['bottom', 'marginBottom', 'marginLeft', 'transform']

      @view.$placeholder.css.args[0][0].bottom
        .should.equal '868.296px'

    it 'scales the placeholder and sets it at ground level if the significant dimension is greater than 100', ->
      @view.$placeholder.css = sinon.stub()
      @view.artwork.dimensions = -> '101 x 20 x 30in'
      @view.scalePlaceholder()

      Object.keys @view.$placeholder.css.args[0][0]
        .should.eql ['bottom', 'marginLeft', 'transform', 'transformOrigin']

      @view.$placeholder.css.args[0][0].bottom
        .should.equal '624.91px'
