_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
moment = require 'moment'
{ fabricate } = require '@artsy/antigravity'
Fair = require '../../models/fair'
Fairs = require '../../collections/fairs'

describe 'Fairs', ->
  describe '#pastYearRoundFairs', ->

    beforeEach ->
      @clock = sinon.useFakeTimers()

    afterEach ->
      @clock.restore()

    it 'should not display upcoming fairs', ->
      fairs = new Fairs([
        fabricate('fair',
          { id: 'fair1', end_at: moment().subtract(7, 'days'), has_full_feature: true })
        fabricate('fair',
          { id: 'fair2', end_at: moment().add(7, 'days'), has_full_feature: true })
        fabricate('fair',
          { id: 'fair3', end_at: moment().add(7, 'days'), has_full_feature: true })
      ])

      pastFairs = fairs.pastYearRoundFairs()
      pastFairs.length.should.eql 1
