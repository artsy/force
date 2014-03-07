_               = require 'underscore'
sd              = require('sharify').data
should          = require 'should'
sinon           = require 'sinon'
Backbone        = require 'backbone'
Following       = require '../collection'
Follow          = require '../model'
Profile         = require '../../../models/profile'
{ fabricate }   = require 'antigravity'

describe 'Follows', ->
  beforeEach ->
    @follow1  = new Follow { id: '111', name: 'follow1', profile: { id: 'profile-1' } }
    @follow2  = new Follow { id: '222', name: 'follow2', profile: { id: 'profile-2' } }
    @follows  = new Following null, kind: 'profile'
    @follows.reset()
    @follows.add @follow1

  describe "#initialize", ->
    it 'binds to add / remove callbacks to proxy model specific event triggers', ->
      onAdd     = sinon.spy()
      onRemove  = sinon.spy()
      @follows.on "add:#{@follow2.get('profile').id}", onAdd
      @follows.on "remove:#{@follow2.get('profile').id}", onRemove
      @follows.add @follow2
      @follows.remove @follow2
      onAdd.callCount.should.equal 1
      onRemove.callCount.should.equal 1

  describe "#isFollowing", ->
    it 'returns true if the profile is in this collection', ->
      profile = new Profile @follow1.get('profile')
      @follows.isFollowing(profile.id).should.be.true

    it 'returns false if the profile is not in this collection', ->
      profile = new Profile @follow2.get('profile')
      @follows.isFollowing(profile.id).should.be.false

  describe "#findByModelId", ->
    it 'returns a Follow model from the collection with a profile id', ->
      follow = @follows.findByModelId @follow1.get('profile').id
      follow.should.equal @follow1

  describe '#syncFollows', ->
    it 'returns without a current user', ->
      fetchSpy = sinon.spy @follows, 'fetch'
      @follows.syncFollows [@follow2.get('profile').id]
      fetchSpy.callCount.should.equal 0
      fetchSpy.restore()

  describe "with a current user", ->
    beforeEach ->
      @profileId = @follow2.get('profile').id
      sinon.stub Backbone, 'sync'
      sd.CURRENT_USER = 'existy'

    afterEach ->
      delete @profileId
      Backbone.sync.restore()

    describe '#syncFollows', ->
      it 'adds given profiles to the collection if the current user follows them', ->
        onAdd = sinon.spy()
        @follows.on "add:#{@profileId}", onAdd
        @follows.syncFollows [@profileId]
        Backbone.sync.args[0][2].data.profiles.should.include @follow2.get('profile').id
        Backbone.sync.args[0][2].success [ @follow2.attributes ]
        onAdd.callCount.should.equal 1
        @follows.should.have.lengthOf 2
        @follows.findByModelId(@profileId).get('id').should.equal @follow2.get('id')

      it 'should not cache the result and retain models', ->
        @follows.syncFollows [@profileId]
        Backbone.sync.args[0][2].cache.should.be.false

      it 'should retain the models when fetching', ->
        @follows.syncFollows [@profileId]
        Backbone.sync.args[0][2].remove.should.be.false
        Backbone.sync.args[0][2].merge.should.be.true

      it 'breaks sync requests up so that no more than @maxSyncSize are requested at a time', ->
        profileIds = []
        sinon.spy @follows, 'syncFollows'
        @follows.maxSyncSize = 10
        _(22).times (n) =>
          profileIds.push "profile-#{n}"
        @follows.syncFollows profileIds

        @follows.syncFollows.getCall(0).args[0].should.equal profileIds
        Backbone.sync.args[0][2].data.profiles.should.have.lengthOf 10
        Backbone.sync.args[0][2].success []

        rest = _.rest profileIds, 10
        for n in _.rest(profileIds, 10)
          @follows.syncFollows.getCall(1).args[0].should.containEql n
        Backbone.sync.args[1][2].data.profiles.should.have.lengthOf 10
        Backbone.sync.args[1][2].success []

        rest = _.rest profileIds, 20
        for n in _.rest(profileIds, 20)
          @follows.syncFollows.getCall(2).args[0].should.containEql n
        Backbone.sync.args[2][2].data.profiles.should.have.lengthOf 2
        Backbone.sync.args[2][2].success []

        @follows.syncFollows.getCall(3).args[0].should.have.lengthOf 0
        @follows.syncFollows.callCount.should.equal 4

        @follows.syncFollows.restore()

    describe "#follow", ->
      it 'creates a follow through the API and updates the collection', ->
        onAdd = sinon.spy()
        onSuccess = sinon.spy()
        @follows.on "add:#{@profileId}", onAdd
        @follows.follow @profileId, { success: onSuccess }
        Backbone.sync.args[0][0].should.equal 'create'
        _.keys(Backbone.sync.args[0][1].attributes).should.include 'profile_id'
        _.keys(Backbone.sync.args[0][1].attributes).should.include 'profile'
        Backbone.sync.args[0][1].attributes.profile.id.should.equal @profileId
        Backbone.sync.args[0][2].success @follow2.attributes
        onAdd.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @follows.should.have.lengthOf 2
        @follows.findByModelId(@profileId).get('name').should.equal @follow2.get('name')

    describe "#unfollow", ->
      it 'destroys a follow through the API and updates the collection', ->
        @follows.add @follow2
        @follows.should.have.lengthOf 2
        onRemove = sinon.spy()
        onSuccess = sinon.spy()
        @follows.on "remove:#{@profileId}", onRemove
        @follows.unfollow @profileId, { success: onSuccess }
        Backbone.sync.args[0][0].should.equal 'delete'
        Backbone.sync.args[0][1].attributes.should.equal @follow2.attributes
        Backbone.sync.args[0][2].success @follow2.attributes
        onRemove.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @follows.should.have.lengthOf 1
