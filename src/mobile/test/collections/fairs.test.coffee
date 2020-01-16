_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
moment = require 'moment'
{ fabricate } = require '@artsy/antigravity'
Fair = require '../../models/fair'
Fairs = require '../../collections/fairs'

describe 'Fairs', ->

  describe '#pastYearRoundFairs', ->
    it 'should not display upcoming fairs', ->
      fairs = new Fairs([
        fabricate('fair',
          { id: 'fair1', end_at: moment().utc().subtract(1, 'milliseconds'), has_full_feature: true })
        fabricate('fair',
          { id: 'fair1', end_at: moment().utc().add(7, 'days'), has_full_feature: true })
        fabricate('fair',
          { id: 'fair2', end_at: moment().utc().add(14, 'days'), has_full_feature: true })
        fabricate('fair3',
          { id: 'fair3', end_at: moment().utc().add(21, 'days'), has_full_feature: true })
      ])

      pastFairs = fairs.pastYearRoundFairs()

      pastFairs.length.should.eql 1
