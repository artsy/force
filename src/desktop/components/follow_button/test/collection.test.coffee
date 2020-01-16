_ = require 'underscore'
sd = require('sharify').data
benv = require 'benv'
should = require 'should'
sinon = require 'sinon'
Backbone = require 'backbone'
Follow = require '../model'
Profile = require '../../../models/profile'
{ fabricate } = require '@artsy/antigravity'
Following = require '../collection'
CurrentUser = require '../../../models/current_user.coffee'

describe 'Following collection', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()
  after ->
    benv.teardown()

  beforeEach ->
    @follow1 = new Follow id: '111', name: 'follow1', profile: id: 'profile-1'
    @follow2 = new Follow id: '222', name: 'follow2', profile: id: 'profile-2'
    @following = new Following null, kind: 'profile'
    @following.reset()
    @following.add @follow1

  describe "#initialize", ->
    it 'binds to add / remove callbacks to proxy model specific event triggers', ->
      onAdd = sinon.spy()
      onRemove = sinon.spy()
      @following.once "add:#{@follow2.get('profile').id}", onAdd
      @following.once "remove:#{@follow2.get('profile').id}", onRemove
      @following.add @follow2
      @following.remove @follow2
      onAdd.callCount.should.equal 1
      onRemove.callCount.should.equal 1

  describe "#isFollowing", ->
    it 'returns true if the profile is in this collection', ->
      profile = new Profile @follow1.get('profile')
      @following.isFollowing(profile.id).should.be.true()

    it 'returns false if the profile is not in this collection', ->
      profile = new Profile @follow2.get('profile')
      @following.isFollowing(profile.id).should.be.false()

  describe "#findByModelId", ->
    it 'returns a Follow model from the collection with a profile id', ->
      follow = @following.findByModelId @follow1.get('profile').id
      follow.should.equal @follow1

  describe '#syncFollows', ->
    it 'returns without a current user', ->
      sinon.stub CurrentUser, 'orNull', -> null
      fetchSpy = sinon.spy @following, 'fetch'
      @following.syncFollows [@follow2.get('profile').id]
      fetchSpy.callCount.should.equal 0
      fetchSpy.restore()
      CurrentUser.orNull.restore()

  describe "with a current user", ->
    beforeEach ->
      @profileId1 = @follow1.get('profile').id
      @profileId2 = @follow2.get('profile').id
      sinon.stub(Backbone, 'sync').yieldsTo 'success'
      sd.CURRENT_USER = 'existy'

    afterEach ->
      delete @profileId1
      Backbone.sync.restore()

    describe '#syncFollows', ->
      it 'adds given profiles to the collection if the current user follows them', ->
        onAdd = sinon.stub()
        @following.once "add:#{@profileId2}", onAdd
        @following.syncFollows [@profileId2]
        Backbone.sync.args[0][2].data.profiles.should.containEql @follow2.get('profile').id
        Backbone.sync.args[0][2].success [@follow2.attributes]
        onAdd.callCount.should.equal 1
        @following.should.have.lengthOf 2
        @following.findByModelId(@profileId2).id.should.equal @follow2.id

      it 'should not cache the result and retain models', ->
        @following.syncFollows [@profileId2]
        Backbone.sync.args[0][2].cache.should.be.false()

      it 'should retain the models when fetching', ->
        @following.syncFollows [@profileId2]
        Backbone.sync.args[0][2].remove.should.be.false()
        Backbone.sync.args[0][2].merge.should.be.true()

      it 'breaks sync requests up so that no more than @maxSyncSize are requested at a time', ->
        profileIds = []
        sinon.spy @following, 'syncFollows'
        @following.maxSyncSize = 10
        _(22).times (n) ->
          profileIds.push "profile-#{n}"
        @following.syncFollows profileIds

        @following.syncFollows.getCall(0).args[0].should.equal profileIds
        Backbone.sync.args[0][2].data.profiles.should.have.lengthOf 10
        Backbone.sync.args[0][2].success []

        rest = _.rest profileIds, 10
        for n in _.rest(profileIds, 10)
          @following.syncFollows.getCall(1).args[0].should.containEql n
        Backbone.sync.args[1][2].data.profiles.should.have.lengthOf 10
        Backbone.sync.args[1][2].success []

        rest = _.rest profileIds, 20
        for n in _.rest(profileIds, 20)
          @following.syncFollows.getCall(2).args[0].should.containEql n
        Backbone.sync.args[2][2].data.profiles.should.have.lengthOf 2
        Backbone.sync.args[2][2].success []

        @following.syncFollows.getCall(3).args[0].should.have.lengthOf 0
        @following.syncFollows.callCount.should.equal 4

        @following.syncFollows.restore()

    describe "#follow", ->
      it 'creates a follow through the API and updates the collection', ->
        onAdd = sinon.spy()
        onSuccess = sinon.spy()
        @following.once "add:#{@profileId2}", onAdd
        @following.follow @profileId2, success: onSuccess
        Backbone.sync.args[0][0].should.equal 'create'
        _.keys(Backbone.sync.args[0][1].attributes).should.containEql 'profile_id'
        _.keys(Backbone.sync.args[0][1].attributes).should.containEql 'profile'
        Backbone.sync.args[0][1].attributes.profile.id.should.equal @profileId2
        onAdd.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @following.should.have.lengthOf 2
        @following.findByModelId(@profileId2).get('profile_id').should.equal @profileId2

    describe "#unfollow", ->
      it 'destroys a follow through the API and updates the collection', ->
        @following.add @follow2
        @following.should.have.lengthOf 2
        onRemove = sinon.spy()
        onSuccess = sinon.spy()
        @following.once "remove:#{@profileId2}", onRemove
        @following.unfollow @profileId2, success: onSuccess
        Backbone.sync.args[0][0].should.equal 'delete'
        Backbone.sync.args[0][1].attributes.should.equal @follow2.attributes
        onRemove.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @following.should.have.lengthOf 1
