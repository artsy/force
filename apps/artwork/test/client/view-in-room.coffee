_               = require 'underscore'
# rewire          = require 'rewire'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

ViewInRoomView  = benv.requireWithJadeify resolve(__dirname, '../../client/view-in-room'), ['template']
Artwork         = require '../../../../models/artwork'

describe 'ViewInRoomView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.support.transition = { end: 'transitionend' }
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @artwork    = new Artwork(fabricate 'artwork', width: 20)
    $container  = $('<div></div>')
    $img        = $('<img>').
      width(200).height(200).
      attr('src', 'foobar.jpg').
      css(top: '200px', left: '200px')

    @view = new ViewInRoomView $container: $container, $img: $img, artwork: @artwork

    done()

  describe '#initialize', ->
    it 'has a bunch of stuff it needs', ->
      @view.$container.length.should.be.ok
      @view.$img.length.should.be.ok
      @view.artwork.id.should.equal @artwork.id

  describe 'rendered', ->
    beforeEach ->
      @view._render()
      @view.cacheSelectors()

    describe '#cacheSelectors', ->
      it 'caches the selectors needed for the view', ->
        @view.$artwork.length.should.be.ok
        @view.$placeholder.length.should.be.ok
        @view.$room.length.should.be.ok

    describe '#injectImage', ->
      beforeEach ->
        @view.injectImage()
      it 'creates two copies of the passed in image', ->
        @view.$placeholder.attr('src').should.equal @view.$img.attr('src')
        @view.$artwork.attr('src').should.equal @view.$img.attr('src')
      it 'positions the artwork', ->
        style = @view.$artwork.attr('style')
        style.should.include 'top'
        style.should.include 'left'
        style.should.include 'width'
        style.should.include 'height'

    describe '#roomScalingFactor', ->
      it 'returns a non-zero value to scale the room by', ->
        @view.$room.width 2000
        @view.$room.height 1000
        @view.$window.width = -> 640
        @view.$window.height = -> 480
        @view.roomScalingFactor().should.equal 0.48
      it 'returns a non-zero value to scale the room by', ->
        @view.$room.width 2000
        @view.$room.height 1000
        @view.$window.width = -> 480
        @view.$window.height = -> 640
        @view.roomScalingFactor().should.equal 0.64

    describe '#artworkScalingFactor', ->
      it 'returns a non-zero factor to scale the artwork by', ->
        @view.$placeholder.width(200)
        @view.getArtworkDimensions = -> [20, 20]
        @view.artworkScalingFactor().should.equal 0.65
