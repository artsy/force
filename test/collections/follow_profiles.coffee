_              = require 'underscore'
sd             = require('sharify').data
should         = require 'should'
sinon          = require 'sinon'
{ fabricate }  = require 'antigravity'
Backbone       = require 'backbone'
CurrentUser    = require '../../models/current_user.coffee'
FollowProfiles = require '../../collections/follow_profiles'
FollowProfile  = require '../../models/follow_profile'
Profile        = require '../../models/profile'

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
      @followProfiles.isFollowing(profile).should.be.true

    it 'returns false if the profile is not in this collection', ->
      profile = new Profile @followProfile2.get('profile')
      @followProfiles.isFollowing(profile).should.be.false

  describe "#findByProfileId", ->

    it 'returns a FollowProfile model from the collection with a profile id', ->
      profileId = @followProfile1.get('profile').id
      followProfile = @followProfiles.findByProfileId profileId
      followProfile.should.equal @followProfile1

  describe '#syncFollows', ->
    it 'returns without a current user', ->
      fetchSpy = sinon.spy @followProfiles, 'fetch'
      @followProfiles.syncFollows [@followProfile2.get('profile').id]
      fetchSpy.callCount.should.equal 0

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
        Backbone.sync.args[0][2].data.profiles.should.include @followProfile2.get('profile').id
        Backbone.sync.args[0][2].success [ @followProfile2.attributes ]
        onAdd.callCount.should.equal 1
        @followProfiles.should.have.lengthOf 2
        @followProfiles.findByProfileId(@profileId).get('id').should.equal @followProfile2.get('id')

      it 'should not cache the result and retain models', ->
        @followProfiles.syncFollows [@profileId]
        Backbone.sync.args[0][2].cache.should.be.false

      it 'should retain the models when fetching', ->
        @followProfiles.syncFollows [@profileId]
        Backbone.sync.args[0][2].remove.should.be.false
        Backbone.sync.args[0][2].merge.should.be.true

    describe "#follow", ->

      it 'throws an exception without a success callback', ->
        (-> @followProfiles.follow(@profileId, { })).should.throw()
        (-> @followProfiles.follow(@profileId)).should.throw()

      it 'creates a follow through the API and updates the collection', ->
        onAdd = sinon.spy()
        onSuccess = sinon.spy()
        @followProfiles.on "add:#{@profileId}", onAdd
        @followProfiles.follow @profileId, { success: onSuccess }
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][1].attributes.should.have.keys 'profile_id'
        Backbone.sync.args[0][2].success @followProfile2.attributes
        onAdd.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @followProfiles.should.have.lengthOf 2

    describe "#unfollow", ->

      it 'throws an exception without a success callback', ->
        (-> @followProfiles.follow(@profileId, { })).should.throw()
        (-> @followProfiles.follow(@profileId)).should.throw()

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
