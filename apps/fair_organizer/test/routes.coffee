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
    @fair = new Fair fabricate 'fair', start_at: moment().subtract(1, 'day')
    @req = { params: { id: 'the-armory-show-temp' }, query: {} }
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd: { API_URL: 'http://localhost:5000', FAIR: @fair }
        fair: @fair
        profile: new Profile(fabricate 'fair_profile')
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#all', ->
    it 'next is called when a fair has already opened', ->
      @fair.hasOpened().should.be.true
      routes.overview @req, @res, (next = sinon.stub())
      next.called.should.be.ok

    it 'renders the page when the fair has not yet opened', ->
      @res.locals.fair.unset 'start_at'
      @res.locals.fair.hasOpened().should.not.be.ok
      routes.overview @req, @res, (next = sinon.stub())
      next.called.should.not.be.ok

  describe '#overview', ->
    it 'nexts to the fair if a microsite param is added', ->
      @req.query.microsite = true
      routes.overview @req, @res, @next
      @next.called.should.be.true
      @res.render.called.should.be.false
