benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
mediator = require '../../../lib/mediator.coffee'
JumpView = require '../view.coffee'
{ resolve } = require 'path'

describe 'JumpView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @view = new JumpView
      done()

  afterEach ->
    benv.teardown()

  describe '#initialize', ->
    it 'should have some defaults', ->
      @view.state.should.equal 'hidden'
      @view.isScrolling.should.equal false
      @view.$el.attr('data-state').should.equal 'hidden'

    it 'accepts a direction', ->
      jump = new JumpView direction: 'bottom'
      jump.$el.hasClass('from-bottom').should.be.true()
      jump = new JumpView
      jump.$el.hasClass('from-top').should.be.true()

  describe '#toggle', ->
    it 'toggles between view states depending on the position of the window scrollTop', ->
      @view.state.should.equal 'hidden'
      @view.toggle()
      @view.state.should.equal 'hidden'
      scrollStub = sinon.stub $.fn, 'scrollTop', => (@view.threshold + 1)
      @view.state.should.equal 'hidden'
      @view.toggle()
      @view.state.should.equal 'visible'
      $(window).scrollTop.restore() # Restore

  describe '#shouldBe', ->
    it 'sets the view state and data-state on the $el', ->
      @view.state.should.equal 'hidden'
      @view.shouldBe 'visible'
      @view.state.should.equal 'visible'
      @view.$el.data('state').should.equal 'visible'

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

    describe '#scrollToTop', ->
      it 'scrolls to the top of the page and hides the navigation', ->
        @view.shouldBe 'visible'
        @view.scrollToTop()
        @animateSpy.args[0][0].scrollTop.should.equal 0
        @view.$el.data('state').should.equal 'hidden'
