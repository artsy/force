{ fabricate } = require '@artsy/antigravity'
PartnerShow = require '../../models/partner_show'

describe 'PartnerShowEvent', ->
  beforeEach ->
    @show = new PartnerShow fabricate 'show'

  describe '#eventType', ->
    it 'returns correctly formatted event types', ->
      formattedEvents = @show.related().showEvents.invoke 'eventType'
      formattedEvents.should.be.match ['Opening Reception', 'Event']

  describe '#formatDateRange', ->
    it 'returns correctly formatted running dates', ->
      formattedEvents = @show.related().showEvents.map (show) -> show.formatDateRange('start_at', 'end_at')
      formattedEvents.should.be.match [
        'Wednesday, Jan 7th, 8pm – 9pm'
        'Thursday, Jan 8th, 7:15pm – Friday, Jan 9th, 2am'
      ]
