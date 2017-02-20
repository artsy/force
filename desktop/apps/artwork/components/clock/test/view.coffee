benv = require 'benv'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
ClockView = benv.requireWithJadeify require.resolve('../view'), ['template']

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

  afterEach ->
    @clock.restore()

  it 'renders the clock when there is a timestamp in the future', ->
    timestamp = moment().add(1, 'day').format()
    view = new ClockView timestamp: timestamp
    view.render().$el.text()
      .should.equal '01day00hr00min00sec'

  it 'optionally accepts a label', ->
    timestamp = moment().add(1, 'day').format()
    view = new ClockView label: 'Auction closes in', timestamp: timestamp
    view.render().$el.text()
      .should.equal 'Auction closes in01day00hr00min00sec'

  it 'renders empty if the timestamp has passed', ->
    timestamp = moment().subtract(1, 'day').format()
    view = new ClockView timestamp: timestamp
    view.render().$el.html().should.equal ''
