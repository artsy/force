benv = require 'benv'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'

describe 'ClockView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @clock = sinon.useFakeTimers()
    # FIXME: conflicts with jsdom
    # sinon.spy(window.location, 'reload')

    # Dynamically import ClockView constructor so that it pulls in the stubbed
    # setTimeout from sinon.useFakeTimers.
    @ClockView = benv.requireWithJadeify require.resolve('../view'), ['template']
    
  afterEach ->
    @clock.restore()
    # FIXME: conflicts with jsdom
    # location.reload.restore()

  xit 'does trigger a reload for a timestamp 1 day away, only after the day passes', ->
    # FIXME: jsdom window errors on window.location.reload
    timestamp = moment().add(1, 'day').format()
    view = new @ClockView timestamp: timestamp
    @clock.tick(23 * 60 * 60 * 1000)
    window.location.reload.called.should.be.false()
    @clock.tick(60 * 60 * 1000)
    window.location.reload.called.should.be.true()

  xit 'does not trigger an immediate reload for a timestamp 26 days away (past the 24.8 day limit for setTimeout)', ->
    timestamp = moment().add(26, 'day').format()
    view = new @ClockView timestamp: timestamp
    @clock.tick(1000)
    window.location.reload.called.should.be.false()

  it 'renders the clock when there is a timestamp in the future', ->
    timestamp = moment().add(1, 'day').format()
    view = new @ClockView timestamp: timestamp
    view.render().$el.text()
      .should.equal '01day00hr00min00sec'

  it 'optionally accepts a label', ->
    timestamp = moment().add(1, 'day').format()
    view = new @ClockView label: 'Auction closes in', timestamp: timestamp
    view.render().$el.text()
      .should.equal 'Auction closes in01day00hr00min00sec'

  it 'renders empty if the timestamp has passed', ->
    timestamp = moment().subtract(1, 'day').format()
    view = new @ClockView timestamp: timestamp
    view.render().$el.html().should.equal ''
