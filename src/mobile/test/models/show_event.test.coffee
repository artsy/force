{ fabricate } = require '@artsy/antigravity'
Show = require '../../models/show'

describe 'ShowEvent', ->
  beforeEach ->
    @show = new Show fabricate 'show'

  describe '#eventType', ->
    it 'returns correctly formatted event types', ->
      formattedEvents = @show.related().showEvents.invoke 'eventType'
      formattedEvents.should.be.match ['Opening Reception', 'Event']
