{ fabricate } = require '@artsy/antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
moment = require 'moment'
routes = rewire '../routes'
CurrentUser = require '../../../models/current_user.coffee'
Fair = require '../../../models/fair.coffee'
Fairs = require '../../../collections/fairs.coffee'
FairOrganizer = require '../../../models/fair_organizer.coffee'
Profile = require '../../../models/profile.coffee'

describe 'Fair Organization routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @fairOrg = new FairOrganizer fabricate 'fair_organizer'
    @fair = new Fair fabricate 'fair'
    @req =
      params: { id: 'the-armory-show-temp' },
      query: {},
      profile: new Profile(fabricate 'fair_organizer_profile')
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd: { API_URL: 'http://localhost:5000', FAIR_ORG: @fairOrg }
        fairOrg: @fairOrg
        profile: new Profile(fabricate 'fair_organizer_profile')
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#overview', ->
    it 'next is called without a fair org', ->
      delete @res.locals.fairOrg
      routes.overview @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

    it 'renders the overview template', ->
      routes.overview @req, @res
      @res.render.args[0][0].should.equal 'index'

  describe '#fetchFairOrgData', ->
    beforeEach ->
      @fairs = new Fairs [
        fabricate('fair', name: _.uniqueId(), id: _.uniqueId(), _id: _.uniqueId()),
        fabricate('fair', name: _.uniqueId(), id: _.uniqueId(), _id: _.uniqueId()),
        fabricate('fair', name: _.uniqueId(), id: _.uniqueId(), _id: _.uniqueId())
      ]

    it 'redirects to the fair if there is a current fair', ->
      fair = @fairs.first()
      fair.set
        autopublish_artworks_at: moment().utc().subtract(5, 'days').format()
        start_at: moment().utc().subtract(3, 'days').format()
        end_at: moment().utc().add(3, 'days').format()
      routes.fetchFairOrgData @req, @res, (next = sinon.stub())
      Backbone.sync.args[0][2].success @fairs.models
      @res.redirect.args[0][0].should.equal '/the-armory-show'
