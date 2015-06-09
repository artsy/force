_ = require 'underscore'
{ fabricate } = require 'antigravity'
sd = require('sharify').data
should = require 'should'
Backbone = require 'backbone'
PartnerShow = require '../../models/partner_show'
sinon = require 'sinon'
moment = require 'moment'

describe 'PartnerShowEvent', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @partnerShow = new PartnerShow fabricate('show')

  afterEach ->
    Backbone.sync.restore()

  describe '#eventType', ->

    it 'returns correctly formatted event types', ->
      formattedEvents =  @partnerShow.related().showEvents.invoke 'eventType'
      formattedEvents.should.be.match [ 'Opening Reception', 'Event' ]

  describe '#runningDates', ->

    it 'returns correctly formatted running dates', ->
      formattedEvents =  @partnerShow.related().showEvents.invoke 'runningDates'
      formattedEvents.should.be.match [
        'January 7th, 8pm - 9pm',
        'January 8th, 7:15pm - January 9th, 2am'
      ]
