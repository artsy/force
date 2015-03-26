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
    @fairOrg = new Fair fabricate 'fair_organizer'
    @req = { params: { id: 'the-armory-show-temp' }, query: {} }
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd: { API_URL: 'http://localhost:5000', FAIR_ORG: @fairOrg }
        fairOrg: @fairOrg
        profile: new Profile(fabricate 'fair_profile')
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()


  describe '#overview', ->
    it 'next is called without a fair org', ->
      delete @res.locals.fairOrg
      routes.overview @req, @res, (next = sinon.stub())
      next.called.should.be.ok

    it 'renders the overview template', ->
      routes.overview @req, @res
      @res.render.args[0][0].should.equal 'overview'