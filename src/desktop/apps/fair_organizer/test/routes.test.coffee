{ fabricate } = require '@artsy/antigravity'
fixtures = require '../../../test/helpers/fixtures.coffee'
_ = require 'underscore'
Q = require 'bluebird-q'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
moment = require 'moment'
routes = rewire '../routes'
CurrentUser = require '../../../models/current_user.coffee'
FairOrganizer = require '../../../models/fair_organizer.coffee'
Fair = require '../../../models/fair.coffee'
Fairs = require '../../../collections/fairs.coffee'
Profile = require '../../../models/profile.coffee'

class OrderedSetsFixture extends Backbone.Collection
  fetchAll: -> then: (cb) -> cb()
routes.__set__ 'OrderedSets', OrderedSetsFixture

describe 'Fair Organization routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @fairOrg = new FairOrganizer fabricate 'fair_organizer'
    @fair = new Fair fabricate 'fair'
    @req = { params: { id: 'the-armory-show-temp' }, query: {} }
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd: { API_URL: 'http://localhost:5000', FAIR_ORG: @fairOrg }
        fairOrg: @fairOrg
        profile: new Profile(fabricate 'fair_organizer_profile')
    @next = sinon.stub()

    @clock = sinon.useFakeTimers()

  afterEach ->
    Backbone.sync.restore()
    @clock.restore()


  describe '#fetchFairOrgData', ->
    beforeEach ->
      @fairs = new Fairs [
        fabricate('fair', name: _.uniqueId(), id: _.uniqueId(), _id: _.uniqueId()),
        fabricate('fair', name: _.uniqueId(), id: _.uniqueId(), _id: _.uniqueId()),
        fabricate('fair', name: _.uniqueId(), id: _.uniqueId(), _id: _.uniqueId())
      ]

    it 'fetches the fair organizer and associated fairs', ->
      Backbone.sync.onCall(0).yieldsTo 'success', @fairs.models
      Backbone.sync.yieldsTo 'success'
      routes.fetchFairOrgData(@req, @res, (next = sinon.stub())).then =>
        @res.locals.sd.FAIR_IDS.should.eql @fairs.pluck('_id')
        @res.locals.sd.FAIR_ORGANIZER.should.eql @fairOrg.toJSON()

    it 'redirects to the fair if there is a current fair with public profile', ->
      fair = @fairs.first()
      fair.set
        autopublish_artworks_at: moment().utc().subtract(5, 'days').format()
        start_at: moment().utc().subtract(3, 'days').format()
        end_at: moment().utc().add(3, 'days').format()

      Backbone.sync.onCall(0).yieldsTo 'success', @fairs.models
      Backbone.sync
        .onCall 1
        .yieldsTo 'success'
        .returns Q.promise (resolve, reject) -> resolve(fabricate('fair_profile'))
      Backbone.sync.yieldsTo 'success'
      routes.fetchFairOrgData(@req, @res, (next = sinon.stub())).then =>
        @res.redirect.args[0][0].should.equal '/the-armory-show'

    it 'redirects to the fair if there is a current fair with private profile', ->
      fair = @fairs.first()
      fair.set
        autopublish_artworks_at: moment().utc().subtract(5, 'days').format()
        start_at: moment().utc().subtract(3, 'days').format()
        end_at: moment().utc().add(3, 'days').format()

      Backbone.sync.onCall(0).yieldsTo 'success', @fairs.models
      Backbone.sync
        .onCall 1
        .yieldsTo 'error'
        .returns Q.promise (resolve, reject) -> reject()
      Backbone.sync.yieldsTo 'success'
      routes.fetchFairOrgData(@req, @res, (next = sinon.stub())).then =>
        @res.redirect.notCalled.should.be.ok()
        @res.locals.sd.FAIR_IDS.should.eql @fairs.pluck('_id')
        @res.locals.sd.FAIR_ORGANIZER.should.eql @fairOrg.toJSON()

    it 'sets showName if the all the fairs dont have identical names', ->
      fair = @fairs.first()
      fair.set name: 'modern-fair'
      Backbone.sync.onCall(0).yieldsTo 'success', @fairs.models
      Backbone.sync.yieldsTo 'success'
      routes.fetchFairOrgData(@req, @res, (next = sinon.stub())).then =>
        @res.locals.showName.should.be.true()

  describe '#overview', ->
    it 'next is called without a fair org', ->
      delete @res.locals.fairOrg
      routes.overview @req, @res, (next = sinon.stub())
      next.called.should.be.ok()

    it 'renders the overview template', ->
      routes.overview @req, @res
      @res.render.args[0][0].should.equal 'overview'
