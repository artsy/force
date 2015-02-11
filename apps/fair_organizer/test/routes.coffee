{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
moment = require 'moment'
routes = rewire '../routes'
CurrentUser = require '../../../models/current_user.coffee'
Fair = require '../../../models/fair.coffee'
Profile = require '../../../models/profile.coffee'

describe 'Fair Organization routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @fair = new Fair fabricate 'fair'
    @req = { params: { id: 'the-armory-show-temp' } }
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd: { API_URL: 'http://localhost:5000', FAIR: @fair }
        fair: @fair
        profile: new Profile(fabricate 'fair_profile')

  afterEach ->
    Backbone.sync.restore()

  describe '#all', ->
    xit 'next is called when a fair has already opened', ->
      # fabricated fair has start_at set to `new Date`
      # hence fabricated fair should have already 'opened'
      @fair.hasOpened().should.be.ok
      routes.overview @req, @res, (next = sinon.stub())
      next.called.should.be.ok

    it 'renders the page when the fair has not yet opened', ->
      @res.locals.fair.unset 'start_at'
      @res.locals.fair.hasOpened().should.not.be.ok
      routes.overview @req, @res, (next = sinon.stub())
      next.called.should.not.be.ok