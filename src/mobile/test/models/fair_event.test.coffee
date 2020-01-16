Backbone = require 'backbone'
FairEvent = require '../../models/fair_event.coffee'
{ fabricate } = require '@artsy/antigravity'
moment = require 'moment'

describe 'Fair', ->

  beforeEach ->
    @sd =
      API_URL: 'http://localhost:5000'
    @fairEvent = new FairEvent fabricate 'fair_event'

  describe '#urlRoot', ->

    it 'returns API url to manage this model', ->
      @fairEvent.urlRoot().should.containEql "/api/v1/fair/#{@fairEvent.get('fair').id}/fair_event"

  describe '#getTime', ->

    it 'returns a formatted time span for the event', ->
      @fairEvent.getTime().should.equal "#{moment(@fairEvent.get 'start_at').utc().format('h:mm')}&ndash;#{moment(@fairEvent.get 'end_at').utc().format('h:mma')}"

  describe '#href', ->

    it 'uses a profile id to create a client link to the event', ->
      @fairEvent.href().should.equal "/#{@fairEvent.get('fair').organizer.profile_id}/info/events/#{@fairEvent.get('id')}"

  describe '#icsHref', ->

    it 'uses a profile id to create a client link to the event', ->
      @fairEvent.icsHref().should.equal "undefined/#{@fairEvent.get('fair').organizer.profile_id}/info/events/#{@fairEvent.get('id')}.ics"

  describe '#getDetailDescriptionHtml', ->

    it 'favors the extended description, but will give the description if it is not available', ->
      # Can't use the htmlToMd here
      @fairEvent.getDetailDescriptionHtml().should.containEql @fairEvent.get('extended_description')[5...15]
      @fairEvent.set 'extended_description', null
      @fairEvent.getDetailDescriptionHtml().should.containEql @fairEvent.get('description')[5...15]
