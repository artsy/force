{ fabricate } = require '@artsy/antigravity'
should = require 'should'
FairEvent = require '../../models/fair_event'

describe 'FairEvent', ->

  before ->
    @fairEvent = new FairEvent fabricate('fair_event'), { fairId: 'armory-show-2013' }

  describe '#initialize', ->
    it 'sets the fairId', ->
      @fairEvent.fairId.should.equal 'armory-show-2013'

  describe '#formatDate', ->
    it 'returns the date in Day, Month 1 format', ->
      @fairEvent.formatDate().should.equal 'Saturday, March 8'

  describe '#formatTime', ->
    it 'returns the time in 2:00-4:00AM format', ->
      @fairEvent.formatTime().should.equal '5:15-5:30PM'
