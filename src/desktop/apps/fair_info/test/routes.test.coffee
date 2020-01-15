_ = require 'underscore'
Q = require 'bluebird-q'
routes = require '../routes'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
Profile = require '../../../models/profile'
Fair = require '../../../models/fair'
FairEvents = require '../../../collections/fair_events'

describe 'FairInfo routes', ->

  describe '#assignFair', ->
    beforeEach ->
      @req =
        params:
          id: "the-armory-show-2013"

      @res =
        locals:
          profile: new Profile fabricate 'profile', owner_type: 'Fair', owner: fabricate 'fair'
          sd: {}
          render: sinon.stub()

      @next = sinon.stub()

      sinon.stub Backbone, 'sync'
        .yieldsTo 'success', {}
        .onCall 0
        .yieldsTo 'success', fabricate 'fair'
        .returns Q.resolve {}

    afterEach ->
      Backbone.sync.restore()

    it 'assigns a fair model to locals', ->
      routes.assignFair(@req, @res, @next)
        .then =>
          @res.locals.fair.get('name').should.equal 'Armory Show 2013'

  describe 'routes functions', ->
    beforeEach ->
      @req =
        profile: new Profile fabricate 'profile', owner_type: 'Fair', owner: fabricate 'fair'
        params:
          id: "the-armory-show-2013"

      @res =
        locals:
          sd: {FAIR: fabricate('fair', _id: '1234567890')}
        render: sinon.stub()

      @next = sinon.stub()

    describe '#visitor', ->
      it 'should render visitors page', ->
        routes.visitors(@req, @res)
        @res.render.called.should.be.true
        @res.render.args[0][0].should.equal 'visitors'

    describe '#events', ->
      beforeEach ->
        @res.locals.fair = fabricate 'fair'
        sinon.stub Backbone, 'sync'
          .yieldsTo 'success', [ fabricate('fair_event'), fabricate('fair_event', name: 'my event') ]

      afterEach ->
        Backbone.sync.restore()

      it 'renders events page', ->
        routes.events(@req, @res)
        @res.render.called.should.be.true
        @res.render.args[0][0].should.equal 'events'
        @res.render.args[0][1]['fairEvents'].models.length.should.equal 2
        @res.render.args[0][1]['fairEvents'].models[0].get('name').should.equal 'Welcome'

    describe 'programming', ->
      beforeEach ->
        @res.locals.fair = fabricate 'fair'
        sinon.stub Backbone, 'sync'
          .yieldsTo 'success', [fabricate('article')]

      afterEach ->
        Backbone.sync.restore()

      xit 'renders the article page', ->
        routes.programming(@req, @res, @next)
        @res.render.called.should.be.true
        @res.render.args[0][0].should.equal 'article'
        _.keys(Backbone.sync.args[0][2]['data'].should.containEql 'fair_programming_id')

describe '#info', ->
  beforeEach ->
    @req =
      profile: new Profile fabricate 'profile', owner_type: 'Fair', owner: fabricate 'fair'
      params:
        id: "the-armory-show-2013"

    @res =
      locals:
        sd: {}
      redirect: sinon.stub()

    @next = sinon.stub()

  it 'should redirect to /info/visitors', ->
    routes.info(@req, @res)
    @res.redirect.args[0][0].should.equal 'info/visitors'
