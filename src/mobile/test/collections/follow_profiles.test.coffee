_ = require 'underscore'
sd = require('sharify').data
should = require 'should'
sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
Backbone = require 'backbone'
CurrentUser = require '../../models/current_user.coffee'
FollowProfile = require '../../models/follow_profile.coffee'
FollowProfiles = require '../../collections/follow_profiles.coffee'
Profile = require '../../models/profile.coffee'

describe 'FollowProfiles', ->

  beforeEach ->
    @followProfile1 = new FollowProfile { id: '111', profile: { id: 'profile-1' } }
    @followProfile2 = new FollowProfile { id: '222', profile: { id: 'profile-2' } }
    @followProfiles = new FollowProfiles()
    @followProfiles.reset()
    @followProfiles.add @followProfile1


  describe "#initialize", ->

    it 'binds to add / remove callbacks to proxy model specific event triggers', ->
      onAdd = sinon.spy()
      onRemove = sinon.spy()
      @followProfiles.on "add:#{@followProfile2.get('profile').id}", onAdd
      @followProfiles.on "remove:#{@followProfile2.get('profile').id}", onRemove
      @followProfiles.add @followProfile2
      @followProfiles.remove @followProfile2
      onAdd.callCount.should.equal 1
      onRemove.callCount.should.equal 1

  describe "#isFollowing", ->

    it 'returns true if the profile is in this collection', ->
      profile = new Profile @followProfile1.get('profile')
      @followProfiles.isFollowing(profile.get('id')).should.be.true()

    it 'returns false if the profile is not in this collection', ->
      profile = new Profile @followProfile2.get('profile')
      @followProfiles.isFollowing(profile.get('id')).should.be.false()

  describe "#findByEntityId", ->

    it 'returns a FollowProfile model from the collection with a profile id', ->
      profileId = @followProfile1.get('profile').id
      followProfile = @followProfiles.findByEntityId profileId
      followProfile.should.equal @followProfile1

  describe '#syncFollows', ->

    it 'returns without a current user', ->
      sinon.stub CurrentUser, 'orNull', -> null
      fetchSpy = sinon.spy @followProfiles, 'fetch'
      @followProfiles.syncFollows [@followProfile2.get('profile').id]
      fetchSpy.callCount.should.equal 0
      fetchSpy.restore()
      CurrentUser.orNull.restore()

  describe "with a current user", ->

    beforeEach ->
      @profileId = @followProfile2.get('profile').id
      sinon.stub Backbone, 'sync'
      sinon.stub CurrentUser, 'orNull', -> new CurrentUser(fabricate('user'))

    afterEach ->
      delete @profileId
      Backbone.sync.restore()
      CurrentUser.orNull.restore()

    describe '#syncFollows', ->

      it 'adds given profiles to the collection if the current user follows them', ->
        onAdd = sinon.spy()
        @followProfiles.on "add:#{@profileId}", onAdd
        @followProfiles.syncFollows [@profileId]
        Backbone.sync.args[0][2].data.profiles.should.containEql @followProfile2.get('profile').id
        Backbone.sync.args[0][2].success [ @followProfile2.attributes ]
        onAdd.callCount.should.equal 1
        @followProfiles.should.have.lengthOf 2
        @followProfiles.findByEntityId(@profileId).get('id').should.equal @followProfile2.get('id')

      it 'should not cache the result and retain models', ->
        @followProfiles.syncFollows [@profileId]
        Backbone.sync.args[0][2].cache.should.be.false()

      it 'should retain the models when fetching', ->
        @followProfiles.syncFollows [@profileId]
        Backbone.sync.args[0][2].remove.should.be.false()
        Backbone.sync.args[0][2].merge.should.be.true()

      it 'breaks sync requests up so that no more than @maxSyncSize are requested at a time', ->
        profileIds = []
        sinon.spy @followProfiles, 'syncFollows'
        @followProfiles.maxSyncSize = 10
        _(22).times (n) =>
          profileIds.push "profile-#{n}"
        @followProfiles.syncFollows profileIds

        @followProfiles.syncFollows.getCall(0).args[0].should.equal profileIds
        Backbone.sync.args[0][2].data.profiles.should.have.lengthOf 10
        Backbone.sync.args[0][2].success []

        rest = _.rest profileIds, 10
        for n in _.rest(profileIds, 10)
          @followProfiles.syncFollows.getCall(1).args[0].should.containEql n
        Backbone.sync.args[1][2].data.profiles.should.have.lengthOf 10
        Backbone.sync.args[1][2].success []

        rest = _.rest profileIds, 20
        for n in _.rest(profileIds, 20)
          @followProfiles.syncFollows.getCall(2).args[0].should.containEql n
        Backbone.sync.args[2][2].data.profiles.should.have.lengthOf 2
        Backbone.sync.args[2][2].success []

        @followProfiles.syncFollows.getCall(3).args[0].should.have.lengthOf 0
        @followProfiles.syncFollows.callCount.should.equal 4

        @followProfiles.syncFollows.restore()

    describe "#follow", ->

      it 'creates a follow through the API and updates the collection', ->
        onAdd = sinon.spy()
        onSuccess = sinon.spy()
        @followProfiles.on "add:#{@profileId}", onAdd
        @followProfiles.follow @profileId, { success: onSuccess }
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][1].attributes.should.have.keys 'profile_id', 'profile'
        Backbone.sync.args[0][1].attributes.profile.id.should.equal @profileId
        Backbone.sync.args[0][2].success @followProfile2.attributes
        onAdd.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @followProfiles.should.have.lengthOf 2

    describe "#unfollow", ->

      it 'destroys a follow through the API and updates the collection', ->
        @followProfiles.add @followProfile2
        @followProfiles.should.have.lengthOf 2
        onRemove = sinon.spy()
        onSuccess = sinon.spy()
        @followProfiles.on "remove:#{@profileId}", onRemove
        @followProfiles.unfollow @profileId, { success: onSuccess }
        Backbone.sync.args[0][0].should.equal 'delete'
        Backbone.sync.args[0][1].attributes.should.equal @followProfile2.attributes
        Backbone.sync.args[0][2].success @followProfile2.attributes
        onRemove.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @followProfiles.should.have.lengthOf 1
