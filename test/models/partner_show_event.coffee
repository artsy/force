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

  describe '#formatEvents', ->

    it 'returns correctly formatted events', ->
      formattedEvents =  @partnerShow.related().showEvents.invoke 'formatEvent'
      formattedEvents.should.be.match [
        'Opening Reception: January 7, 8pm - 9pm',
        'Inez and Vinoodh Gallery Walkthrough: January 8, 7:15pm - January 9, 2am'
      ]
