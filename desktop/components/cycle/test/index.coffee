_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Cycle = require '../index'

describe 'Cycle', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @clock = sinon.useFakeTimers()

  afterEach ->
    @clock.restore()

  describe '#step', ->
    before ->
      $('body').html "
        <div id='bicycle-built-for-two'>
          <img id='first' src='/first.jpg'>
          <img id='second' src='/second.jpg'>
        </div>
      "
      @cycle = new Cycle $el: @$el = $('#bicycle-built-for-two'), selector: 'img'
      @$first = @$el.find('#first')
      @$second = @$el.find('#second')

    describe 'step', ->
      it 'steps the cycle', ->
        @cycle.started.should.be.false()

        # Step #1
        @cycle.step()
        @cycle.started.should.be.true()

        @$first.hasClass('is-active').should.be.true()
        @$first.attr('style').should.equal 'z-index: 2; opacity: 1;'
        @$second.hasClass('is-active').should.be.false()

        # Step #2
        @cycle.step()

        @$first.hasClass('is-active').should.be.false()
        @$first.attr('style').should.equal 'z-index: 1; opacity: 0;'
        @$second.hasClass('is-active').should.be.true()
        @$second.attr('style').should.equal 'z-index: 2; opacity: 1;'

        # Step #3 (loops back around)
        @cycle.step()

        @$first.hasClass('is-active').should.be.true()
        @$first.attr('style').should.equal 'z-index: 2; opacity: 1;'
        @$second.hasClass('is-active').should.be.false()
        @$second.attr('style').should.equal 'z-index: 1; opacity: 0;'
