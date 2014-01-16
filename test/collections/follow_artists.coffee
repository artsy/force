_              = require 'underscore'
sd             = require('sharify').data
should         = require 'should'
sinon          = require 'sinon'
{ fabricate }  = require 'antigravity'
Backbone       = require 'backbone'
CurrentUser    = require '../../models/current_user.coffee'
FollowArtists  = require '../../collections/follow_artists'
FollowArtist   = require '../../models/follow_artist'
Artist         = require '../../models/artist'

describe 'FollowArtists', ->

  beforeEach ->
    @followArtist1 = new FollowArtist { id: '111', artist: { id: 'artist-1' } }
    @followArtist2 = new FollowArtist { id: '222', artist: { id: 'artist-2' } }
    @followArtists = new FollowArtists()
    @followArtists.reset()
    @followArtists.add @followArtist1

  describe "#initialize", ->

    it 'binds to add / remove callbacks to proxy model specific event triggers', ->
      onAdd = sinon.spy()
      onRemove = sinon.spy()
      @followArtists.on "add:#{@followArtist2.getItem().id}", onAdd
      @followArtists.on "remove:#{@followArtist2.getItem().id}", onRemove
      @followArtists.add @followArtist2
      @followArtists.remove @followArtist2
      onAdd.callCount.should.equal 1
      onRemove.callCount.should.equal 1

  describe "#isFollowing", ->

    it 'returns true if the artist is in this collection', ->
      artist = new Artist @followArtist1.getItem()
      @followArtists.isFollowing(artist.id).should.be.true

    it 'returns false if the artist is not in this collection', ->
      artist = new Artist @followArtist2.getItem()
      @followArtists.isFollowing(artist.id).should.be.false

  describe "#findByArtistId", ->

    it 'returns a FollowArtist model from the collection with an artist id', ->
      artistId = @followArtist1.get('artist').id
      followArtist = @followArtists.findByItemId artistId
      followArtist.should.equal @followArtist1

  describe '#syncFollows', ->
    it 'returns without a current user', ->
      fetchSpy = sinon.spy @followArtists, 'fetch'
      @followArtists.syncFollows [@followArtist2.getItem().id]
      fetchSpy.callCount.should.equal 0

  describe "with a current user", ->

    beforeEach ->
      @artistId = @followArtist2.getItem().id
      sinon.stub Backbone, 'sync'
      sinon.stub CurrentUser, 'orNull', -> new CurrentUser(fabricate('user'))

    afterEach ->
      delete @artistId
      Backbone.sync.restore()
      CurrentUser.orNull.restore()

    describe '#syncFollows', ->

      it 'adds given artists to the collection if the current user follows them', ->
        onAdd = sinon.spy()
        @followArtists.on "add:#{@artistId}", onAdd
        @followArtists.syncFollows [@artistId]
        Backbone.sync.args[0][2].data.artists.should.include @followArtist2.getItem().id
        Backbone.sync.args[0][2].success [ @followArtist2.attributes ]
        onAdd.callCount.should.equal 1
        @followArtists.should.have.lengthOf 2
        @followArtists.findByItemId(@artistId).get('id').should.equal @followArtist2.get('id')

      it 'should not cache the result and retain models', ->
        @followArtists.syncFollows [@artistId]
        Backbone.sync.args[0][2].cache.should.be.false

      it 'should retain the models when fetching', ->
        @followArtists.syncFollows [@artistId]
        Backbone.sync.args[0][2].remove.should.be.false
        Backbone.sync.args[0][2].merge.should.be.true

    describe "#follow", ->

      it 'creates a follow through the API and updates the collection', ->
        onAdd = sinon.spy()
        onSuccess = sinon.spy()
        @followArtists.on "add:#{@artistId}", onAdd
        @followArtists.follow @artistId, { success: onSuccess }
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][1].attributes.should.have.keys 'artist_id'
        Backbone.sync.args[0][2].success @followArtist2.attributes
        onAdd.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @followArtists.should.have.lengthOf 2

    describe "#unfollow", ->

      it 'destroys a follow through the API and updates the collection', ->
        @followArtists.add @followArtist2
        @followArtists.should.have.lengthOf 2
        onRemove = sinon.spy()
        onSuccess = sinon.spy()
        @followArtists.on "remove:#{@artistId}", onRemove
        @followArtists.unfollow @artistId, { success: onSuccess }
        Backbone.sync.args[0][0].should.equal 'delete'
        Backbone.sync.args[0][1].attributes.should.equal @followArtist2.attributes
        Backbone.sync.args[0][2].success @followArtist2.attributes
        onRemove.callCount.should.equal 1
        onSuccess.callCount.should.equal 1
        @followArtists.should.have.lengthOf 1
