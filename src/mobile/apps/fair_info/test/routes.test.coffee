_ = require 'underscore'
routes = require '../routes'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
Profile = require '../../../models/profile'
Fair = require '../../../models/fair'
FairEvent = require '../../../models/fair_event'
FairEvents = require '../../../collections/fair_events'

describe 'FairInfo routes', ->
  beforeEach ->
    @req =
      profile: new Profile fabricate 'profile', owner_type: 'Fair', owner: fabricate 'fair'
      params:
        id: "the-armory-show-2013"
    @res =
      locals:
        sd: {}
      render: sinon.stub()
    @next = sinon.stub()

  describe '#assignFair', ->
    before ->
      sinon.stub Backbone, 'sync'
        .yieldsTo 'success', {}
        .onCall 0
        .yieldsTo 'success', fabricate 'fair'

    after ->
      Backbone.sync.restore()

    it 'assigns a fair model to locals', ->
      routes.assignFair(@req, @res, @next)
      _.defer =>
        @res.locals.fair.get('name').should.equal 'Armory Show 2013'

  describe '#visitors', ->
    beforeEach ->
      @res.locals.fair = new Fair fabricate 'fair'

    it 'renders the visitors page', ->
      routes.visitors @req, @res, @next
      @res.render.called.should.be.true()
      @res.render.args[0][0].should.eql 'visitors'

  describe '#info', ->
    beforeEach ->
      @res.locals.fair = new Fair fabricate 'fair'

    it 'renders the navigation page', ->
      routes.info @req, @res, @next
      @res.render.called.should.be.true()
      @res.render.args[0][0].should.eql 'index'

  describe '#events', ->
    beforeEach ->
      fairEvents = [
        fabricate 'fair_event'
        fabricate 'fair_event'
        fabricate 'fair_event'
        fabricate 'fair_event'
      ]

      @res.locals.fair = new Fair fabricate 'fair'
      sinon.stub Backbone, 'sync'
        .yieldsTo 'success', fairEvents

    afterEach ->
      Backbone.sync.restore()

    it 'renders the events page', ->
      routes.events @req, @res, @next
      @res.render.called.should.be.true()
      @res.render.args[0][0].should.eql 'events'
      # all events are on the same day, check to make sure there are 4 events
      eventsByDay = @res.render.args[0][1].eventsByDay
      dayKey =  _.first _.keys eventsByDay
      eventsByDay[dayKey].length.should.eql 4

  describe '#singleEvent', ->
    beforeEach ->
      @res.locals.fair = new Fair fabricate 'fair'
      sinon.stub Backbone, 'sync'
        .yieldsTo 'success', fabricate 'fair_event'

    afterEach ->
      Backbone.sync.restore()

    it 'renders the single event page', ->
      routes.singleEvent @req, @res, @next
      @res.render.called.should.be.true()
      @res.render.args[0][0].should.eql 'event'
      @res.render.args[0][1].event.get('name').should.eql 'Welcome'

  describe '#infoProgramming', ->
    beforeEach ->
      @res.locals.fair = new Fair fabricate 'fair'
      sinon.stub Backbone, 'sync'
        .yieldsTo 'success', fabricate 'article'

    afterEach ->
      Backbone.sync.restore()

    xit 'renders the article page', ->
      routes.infoProgramming @req, @res, @next
      _.keys(Backbone.sync.args[0][2]['data']).should.containEql 'fair_programming_id'
      @res.render.called.should.be.true()
      @res.render.args[0][0].should.eql 'article'


