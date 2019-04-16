sinon = require 'sinon'
moment = require 'moment'
countdown = require '../index'

describe 'countdown', ->
  beforeEach ->
    @clock = sinon.useFakeTimers()

  afterEach ->
    @clock.restore()

  it 'computes the countdown units given a timestamp', ->
    timestamp = moment().add(1, 'day').format()

    countdown timestamp
      .should.eql [
        { send: 'days', label: 'day', value: '01' }
        { send: 'hours', label: 'hr', value: '00' }
        { send: 'minutes', label: 'min', value: '00' }
        { send: 'seconds', label: 'sec', value: '00' }
      ]

    @clock.tick 1000

    countdown timestamp
      .should.eql [
        { send: 'days', label: 'day', value: '00' }
        { send: 'hours', label: 'hr', value: '23' }
        { send: 'minutes', label: 'min', value: '59' }
        { send: 'seconds', label: 'sec', value: '59' }
      ]

  it 'returns false if the timestamp has passed', ->
    timestamp = moment().subtract(1, 'day').format()

    countdown timestamp
      .should.be.false()
