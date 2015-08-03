sinon = require 'sinon'
Backbone = require 'backbone'
CollectorProfile = require '../../models/collector_profile'

describe 'CollectorProfile', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @collectorProfile = new CollectorProfile

  afterEach ->
    Backbone.sync.restore()

  describe '#findOrCreate', ->
    describe 'existing collector profile', ->
      it 'fetches the existing collector profile', (done) ->
        promise = @collectorProfile.findOrCreate success: =>
          @collectorProfile.id.should.equal 'existing-collector-profile-id'
          promise.isFulfilled().should.be.true()
          done()
        promise.isFulfilled().should.be.false()
        Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/collector_profile'
        Backbone.sync.args[0][2].success id: 'existing-collector-profile-id'

    describe 'collector profile does not yet exist', ->
      it 'fetches the profile; that errors as it does not exist; so it creates a new one', (done) ->
        promise = @collectorProfile.findOrCreate success: =>
          @collectorProfile.id.should.equal 'fresh-collector-profile-id'
          promise.isFulfilled().should.be.true()
          done()
        promise.isFulfilled().should.be.false()
        Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/collector_profile'
        Backbone.sync.args[0][2].error()
        promise.isFulfilled().should.be.false()
        promise.isRejected().should.be.false()
        Backbone.sync.args[1][0].should.equal 'create'
        Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/collector_profile'
        Backbone.sync.args[1][2].success id: 'fresh-collector-profile-id'
