_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Cycle = require '../index.coffee'

describe 'Cycle', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
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
        # Step #1
        @cycle.step()

        @$first.hasClass('is-active').should.be.true
        @$first.attr('style').should.equal 'opacity: 1; z-index: 2;'
        @$second.hasClass('is-active').should.be.false
        _.isUndefined(@$second.attr('style')).should.be.true

        # Step #2
        @cycle.step()

        @$first.hasClass('is-active').should.be.false
        @$first.hasClass('is-deactivating').should.be.true
        @$first.attr('style').should.equal 'opacity: 0; z-index: 1;'
        @$second.hasClass('is-active').should.be.true
        @$second.attr('style').should.equal 'opacity: 1; z-index: 2;'

        # Step #3 (loops back around)
        @cycle.step()

        @$first.hasClass('is-active').should.be.true
        @$first.attr('style').should.equal 'opacity: 1; z-index: 2;'
        @$second.hasClass('is-active').should.be.false
        @$second.hasClass('is-deactivating').should.be.true
        @$second.attr('style').should.equal 'opacity: 0; z-index: 1;'
