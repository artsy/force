_ = require 'underscore'
sinon = require 'sinon'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
Partner = require '../../../../../models/partner.coffee'
PartnerShow = require '../../../../../models/partner_show.coffee'
PartnerShows = require '../../../../../collections/partner_shows.coffee'
PartnerShowEvents = require '../../../../../collections/partner_show_events.coffee'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

NewsView = benv.requireWithJadeify resolve(
  __dirname, '../view.coffee'
), ['template']


describe 'NewsView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      @partner = new Partner fabricate 'partner'
      @view = new NewsView partner: @partner
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#fetch', ->
    before ->
      @partnerShowEvents = new PartnerShowEvents [fabricate 'show_event']
      @fairBooths = new PartnerShows [fabricate 'show', fair: fabricate 'fair']

    it 'makes proper requests to fetch partner artists', ->
      @view.fetch()
      (requests = Backbone.sync.args).length.should.equal 2
      requests[0][1].url.should.endWith '/api/v1/partner_show_events'
      requests[0][2].data.should.eql partner_id: @partner.get('_id'), status: 'current', sort: 'start_at', size: 3
      requests[1][1].url.should.endWith '/api/v1/shows'
      requests[1][2].data.should.eql partner_id: @partner.get('_id'), status: 'current', sort: 'start_at', size: 3, at_a_fair: true

    it 'returns a thenable promise', ->
      _.isFunction(@view.fetch().then).should.be.ok()

    it 'fetches and returns partner artists', ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', @partnerShowEvents.models

      Backbone.sync
        .onCall 1
        .yieldsTo 'success', @fairBooths.models

      @view.fetch().spread (showEvents, fairBooths) =>
        showEvents.length.should.equal 1
        fairBooths.length.should.equal 1
        showEvents.models.should.eql @partnerShowEvents.models
        fairBooths.models.should.eql @fairBooths.models

  describe '#consolidate', ->
    before ->
      @partnerShowEvents = new PartnerShowEvents [
        fabricate 'show_event', start_at: '2015-02-11T02:00:00+00:00', event_type: 'Opening Receiption'
        fabricate 'show_event', start_at: '2015-02-09T02:00:00+00:00', event_type: 'Artist Talk'
      ]
      @fairBooths = new PartnerShows [
        fabricate 'show', fair: fabricate('fair'), start_at: '2015-02-10T02:00:00+00:00', end_at: '2015-02-17T02:00:00+00:00'
      ]

    it 'combines show events and fair booths and sorts them by start_at', ->
      @view.consolidate(@partnerShowEvents, @fairBooths).should.eql [
          start_at: '2015-02-09T02:00:00+00:00'
          subtitle: 'Artist Talk'
          time: 'Monday, Feb 9th, 2am – Thursday, Feb 9th, 8pm'
          title: @partnerShowEvents.at(1).get('partner_show').name
          titleLink: new PartnerShow(@partnerShowEvents.at(1).get('partner_show')).href()
        ,
          start_at: '2015-02-10T02:00:00+00:00'
          subtitle: 'Fair Booth'
          time: "Feb 10th – 17th 2015"
          title: @fairBooths.at(0).get('name')
          titleLink: @fairBooths.at(0).href()
        ,
          start_at: '2015-02-11T02:00:00+00:00'
          subtitle: 'Opening Receiption'
          time: 'Wednesday, Feb 11th, 2am – Thursday, Feb 9th, 8pm'
          title: @partnerShowEvents.at(0).get('partner_show').name
          titleLink: new PartnerShow(@partnerShowEvents.at(0).get('partner_show')).href()
      ]

    it 'returns only show events if no fair booths', ->
      @view.consolidate(@partnerShowEvents, new PartnerShows).should.eql [
          start_at: '2015-02-09T02:00:00+00:00'
          subtitle: 'Artist Talk'
          time: 'Monday, Feb 9th, 2am – Thursday, Feb 9th, 8pm'
          title: @partnerShowEvents.at(1).get('partner_show').name
          titleLink: new PartnerShow(@partnerShowEvents.at(1).get('partner_show')).href()
        ,
          start_at: '2015-02-11T02:00:00+00:00'
          subtitle: 'Opening Receiption'
          time: 'Wednesday, Feb 11th, 2am – Thursday, Feb 9th, 8pm'
          title: @partnerShowEvents.at(0).get('partner_show').name
          titleLink: new PartnerShow(@partnerShowEvents.at(0).get('partner_show')).href()
      ]

    it 'returns only fair booths if no show events', ->
      @view.consolidate(new PartnerShowEvents, @fairBooths).should.eql [
          start_at: '2015-02-10T02:00:00+00:00'
          subtitle: 'Fair Booth'
          time: "Feb 10th – 17th 2015"
          title: @fairBooths.at(0).get('name')
          titleLink: @fairBooths.at(0).href()
      ]

    it 'returns an empty array if no show events and fair booths', ->
      @view.consolidate(new PartnerShowEvents, new PartnerShows).should.eql []

  describe '#render', ->
    beforeEach ->
      sinon.stub @view, 'remove'

    afterEach ->
      @view.remove.restore()

    it 'removes the view if no news', ->
      @view.render []
      @view.remove.calledOnce.should.be.ok()
