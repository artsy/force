_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
Artist = require '../../../../models/artist'

elWidth = 1000
fixture = """
  <div class='artists-featured-carousel' style='width: #{elWidth}px;'>
    <div class='afc-next'></div>
    <div class='afc-prev'></div>
    <div class='afc-track'>
      <div class='afc-artist' style='width: 50%; float: left;'></div>
      <div class='afc-artist' style='width: 50%; float: left;'></div>
      <div class='afc-artist' style='width: 50%; float: left;'></div>
      <div class='afc-artist' style='width: 50%; float: left;'></div>
      <div class='afc-artist' style='width: 50%; float: left;'></div>
      <div class='afc-artist' style='width: 50%; float: left;'></div>
    </div>
  </div>
"""

describe 'CarouselView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      @CarouselView = require '../../client/carousel.coffee'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new @CarouselView el: $(fixture), skipN: 2
    @view.updateValues($.Event()) # Imitate imagesLoaded

  afterEach ->
    delete @view

  describe '#initalize', ->
    it 'starts at the beginning', ->
      @view.$el.data('position').should.equal 'start'
    it 'parses the panels', ->
      @view.$panels.length.should.equal 6
    it 'sets the stop positions', ->
      @view.positions.length.should.equal @view.$panels.length
      _.each @view.positions, (position) ->
        position.should.be.type 'number'
    it 'sets fixed pixel dimensions on the panels', ->
      @view.$panels.first().attr('style').should.containEql "width: #{elWidth / @view.increment}px"

  describe '#setPosition', ->
    it 'sets the position appropriately', ->
      @view.active = 2
      @view.setPosition()
      @view.$el.attr('data-position').should.equal 'middle'
      @view.active = 0
      @view.setPosition()
      @view.$el.attr('data-position').should.equal 'start'
      @view.active = 4
      @view.setPosition()
      @view.$el.attr('data-position').should.equal 'end'
      @view.active = 6
      @view.setPosition()
      @view.$el.attr('data-position').should.equal 'end'

  describe '#moveToActive', ->
    it 'disallows movement past the bounds of the positions array', ->
      @view.setPosition = sinon.stub()
      @view.active = -1
      @view.moveToActive()
      @view.active.should.equal 0
      @view.setPosition.called.should.not.be.ok()
      @view.active = @view.positions.length + 1
      @view.moveToActive()
      @view.active.should.equal @view.stopAt
      @view.setPosition.called.should.not.be.ok()
    it 'moves the track to the appropriate position', ->
      @view.active = 2
      @view.moveToActive()
      @view.$track.css('marginLeft').should.equal "-#{@view.positions[@view.active]}px"

  describe '#next', ->
    it 'increments the active attribute', ->
      @view.active.should.equal 0
      @view.next()
      @view.active.should.equal @view.increment
      @view.next()
      @view.active.should.equal @view.increment * 2
    it 'calls #moveToActive', ->
      @view.moveToActive = sinon.stub()
      @view.next()
      @view.next()
      @view.moveToActive.calledTwice.should.be.ok()

  describe '#prev', ->
    it 'increments the active attribute', ->
      @view.active.should.equal 0
      @view.prev()
      @view.active.should.equal 0
      @view.active = 4
      @view.prev()
      @view.active.should.equal 4 - @view.increment
    it 'calls #moveToActive', ->
      @view.moveToActive = sinon.stub()
      @view.prev()
      @view.prev()
      @view.moveToActive.calledTwice.should.be.ok()
