benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
mediator = require '../../../lib/mediator.coffee'
JumpView = require '../view.coffee'
{ resolve } = require 'path'

describe 'JumpView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @view = new JumpView
      done()

  afterEach ->
    benv.teardown()

  describe '#initialize', ->
    it 'should have some defaults', ->
      @view.isScrolling.should.equal false

  describe 'Scrolling', ->
    beforeEach ->
      @animateSpy = sinon.spy $.fn, 'animate'
    afterEach ->
      @animateSpy.restore()

    describe '#scrollToPosition', ->
      it 'scrolls to a position on the page', ->
        @view.scrollToPosition 200
        @animateSpy.args[0][0].scrollTop.should.equal 200
        @animateSpy.args[0][1].should.equal @view.duration
