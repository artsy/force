_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Element = require '../element'

setupStubs = (element) ->
  _.reduce ['above', 'below', 'enter', 'leave'], (memo, direction) =>
    memo[direction] = sinon.stub()
    element.$el.on "scroller:#{direction}", memo[direction]
    memo
  , {}

describe 'Scroller', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @Scroller = require '../index'
      $.fn.imagesLoaded = sinon.stub()
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $('body').html """
      <div id='fixture1'></div>
    """

  describe '#listen', ->
    beforeEach ->
      @scroller = new @Scroller

    afterEach ->
      @scroller.remove()

    it 'returns the jQuery object', ->
      el = @scroller.listen $('#fixture1')
      el.length.should.be.ok
      el.should.be.an.instanceOf $

    it 'accepts a selector and returns a jQuery object', ->
      el = @scroller.listen '#fixture1'
      el.length.should.be.ok
      el.should.be.an.instanceOf $

  describe '#detect', ->
    beforeEach ->
      @scroller = new @Scroller
      @element = new Element $('#fixture1')

    afterEach ->
      @scroller.remove()

    describe 'above', ->
      beforeEach ->
        @element.top = 100
        @element.bottom = 200
        @element.inside = true # Will be flipped, otherwise undefined
        @scroller.scrollTop = 0
      it 'sets the correct state when above the element', ->
        @scroller.detect @element
        @element.above.should.be.true
        @element.below.should.be.false
        @element.inside.should.be.false
      it 'triggers the correct events when above the element', ->
        stubs = setupStubs(@element)
        @scroller.detect @element
        stubs.above.called.should.be.true
        stubs.below.called.should.be.false
        stubs.enter.called.should.be.false
        stubs.leave.called.should.be.true

    describe 'below', ->
      beforeEach ->
        @element.top = 100
        @element.bottom = 200
        @element.inside = true # Will be flipped, otherwise undefined
        @scroller.scrollTop = 300
      it 'sets the correct state when below the element', ->
        @scroller.detect @element
        @element.above.should.be.false
        @element.below.should.be.true
        @element.inside.should.be.false
      it 'triggers the correct events when below the element', ->
        stubs = setupStubs(@element)
        @scroller.detect @element
        stubs.above.called.should.be.false
        stubs.below.called.should.be.true
        stubs.enter.called.should.be.false
        stubs.leave.called.should.be.true

    describe 'inside', ->
      beforeEach ->
        @element.top = 100
        @element.bottom = 200
        @scroller.scrollTop = 150
      it 'sets the correct state when inside the element', ->
        @scroller.detect @element
        @element.above.should.be.false
        @element.below.should.be.true
        @element.inside.should.be.true
      it 'triggers the correct events when inside the element', ->
        stubs = setupStubs(@element)
        @scroller.detect @element
        stubs.above.called.should.be.false
        stubs.below.called.should.be.true
        stubs.enter.called.should.be.true
        stubs.leave.called.should.be.false
