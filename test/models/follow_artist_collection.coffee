sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
Artist = require '../../models/artist'
Artists = require '../../collections/artists'
FollowArtistCollection = require '../../models/follow_artist_collection'
CurrentUser = require '../../models/current_user'
benv = require 'benv'
sd = require('sharify').data

{ fabricate } = require 'antigravity'

describe 'FollowArtistCollection', ->

  before (done) ->
    benv.setup =>
      done()

  after benv.teardown

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @currentUser = new CurrentUser(id: "user_id", email: "a@b.c")
    sd.ARTSY_URL = "http://localhost:5000/__api"
    sd.NODE_ENV = 'test'
    @followArtistCollection = new FollowArtistCollection()
    @artists = new Artists
    @artists.add [
      new Artist { id: 'foo', name: 'Foo' }
      new Artist { id: 'bar', name: 'Bar' }
    ]
    @followArtistCollection.get('artists').add @artists.models
    @followArtistCollection.addRepoArtists @artists

  afterEach ->
    Backbone.sync.restore()

  describe 'follow', ->

    it 'adds artist to the followed artists collection', ->
      artist = new Artist { id: 'baz', title: 'Baz' }
      len = @followArtistCollection.get('artists').length
      @followArtistCollection.follow artist.get('id')
      @followArtistCollection.isFollowed(artist).should.be.true
      @followArtistCollection.get('artists').length.should.equal len + 1

    it 'makes an API request to sync the action', ->
      artist = new Artist { id: 'baz', title: 'Baz' }
      @followArtistCollection.follow artist.get('id')
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][1].url.should.include '/api/v1/me/follow/artist?artist_id=baz'

    it 'can trigger add events for a specific artist', (done) ->
      specificArtistAddedCalls = 0
      artist = new Artist({ id: 'baz', title: 'Baz' })
      @followArtistCollection.on "add:#{artist.get('id')}", -> specificArtistAddedCalls += 1
      @followArtistCollection.follow artist.get('id')
      setTimeout ->
        specificArtistAddedCalls.should.equal 1
        done()
      , 100

    it 'can accept a silent option to prevent event triggers', (done) ->
      artistAddedCalls = 0
      specificArtistAddedCalls = 0
      artist = new Artist({ id: 'baz', title: 'Baz' })
      @followArtistCollection.on 'add', -> artistAddedCalls += 1
      @followArtistCollection.on "add:#{artist.get('id')}", -> specificArtistAddedCalls += 1
      @followArtistCollection.follow artist.get('id'), { silent: true }
      setTimeout ->
        artistAddedCalls.should.equal 0
        specificArtistAddedCalls.should.equal 0
        done()
      , 100

    it 'calls the success callback passed in', ->
      successCb = sinon.stub()
      artist = new Artist { id: 'baz', title: 'Baz' }
      @followArtistCollection.follow artist.get('id'), { success: successCb }
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][1].url.should.include '/api/v1/me/follow/artist?artist_id=baz'
      Backbone.sync.args[0][2].success { foo: 'bar' }
      successCb.called.should.be.ok

  describe 'unfollow', ->

    it 'removes artist from the followed artists followArtistCollection', ->
      artist = @followArtistCollection.get('artists').first()
      len = @followArtistCollection.get('artists').length
      @followArtistCollection.unfollow artist.get('id')
      @followArtistCollection.isFollowed(artist).should.be.false
      @followArtistCollection.get('artists').length.should.equal len - 1

    it 'makes an API request to sync the action', ->
      artist = @followArtistCollection.get('artists').first()
      @followArtistCollection.unfollow artist.get('id')
      Backbone.sync.args[0][0].should.equal 'delete'
      Backbone.sync.args[0][1].url.should.include '/api/v1/me/follow/artist/foo'

    it 'can trigger remove events for a specific artist', (done) ->
      specificArtistRemovedCalls = 0
      artist = @followArtistCollection.get('artists').first()
      @followArtistCollection.on "remove:#{artist.get('id')}", -> specificArtistRemovedCalls += 1
      @followArtistCollection.unfollow artist.get('id')
      setTimeout ->
        specificArtistRemovedCalls.should.equal 1
        done()
      , 100

    it 'can accept a silent option to prevent event triggers', (done) ->
      artistRemovedCalls = 0
      specificArtistRemovedCalls = 0
      artist = @followArtistCollection.get('artists').first()
      @followArtistCollection.on 'remove', -> artistRemovedCalls += 1
      @followArtistCollection.on "remove:#{artist.get('id')}", -> specificArtistRemovedCalls += 1
      @followArtistCollection.unfollow artist.get('id'), { silent: true }
      setTimeout ->
        artistRemovedCalls.should.equal 0
        specificArtistRemovedCalls.should.equal 0
        done()
      , 100

    it 'calls the success callback passed in', ->
      successCb = sinon.stub()
      artist = @followArtistCollection.get('artists').first()
      @followArtistCollection.unfollow artist.get('id'), { success: successCb }
      Backbone.sync.args[0][0].should.equal 'delete'
      Backbone.sync.args[0][1].url.should.include '/api/v1/me/follow/artist/foo'
      Backbone.sync.args[0][2].success { foo: 'bar' }
      successCb.called.should.be.ok

  describe 'isFollowed', ->

    it 'determines if an artist is in the user\'s followed artists followArtistCollection', ->
      unfollowedArtist = new Artist({ id: 'baz', title: 'Baz' })
      followedArtist   = @followArtistCollection.get('artists').first()
      @followArtistCollection.isFollowed(unfollowedArtist).should.be.false
      @followArtistCollection.isFollowed(followedArtist).should.be.true

  describe 'broadcastFollowed', ->

    it 'triggers an artist specific add for all artists in the followArtistCollection', (done) ->
      specificArtistAddedCalls = 0
      a1 = @followArtistCollection.get('artists').at 0
      a2 = @followArtistCollection.get('artists').at 1
      @followArtistCollection.on "add:#{a1.get('id')}", -> specificArtistAddedCalls += 1
      @followArtistCollection.on "add:#{a2.get('id')}", -> specificArtistAddedCalls += 1
      @followArtistCollection.broadcastFollowed()
      setTimeout ->
        specificArtistAddedCalls.should.equal 2
        done()
      , 100

  describe 'artistIdsToSync', ->

    it 'returns all artist ids that need a server check to determine if followed', ->
      @followArtistCollection.addRepoArtists new Artists([
        new Artist { id: 'moo', title: 'Moo' }
        new Artist { id: 'gar', title: 'Gar' }
      ])
      @followArtistCollection.artistIdsToSync()[0].should.equal 'moo'
      @followArtistCollection.artistIdsToSync()[1].should.equal 'gar'

      @followArtistCollection.get('artists').add new Artist({ id: 'moo', title: 'Moo' })
      @followArtistCollection.artistIdsToSync()[0].should.equal 'gar'
      @followArtistCollection.artistIdsToSync().length.should.equal 1


  describe 'syncFollowedArtists', ->

    xit 'requests the difference between this followArtistCollection and the application artists repository to determine what\'s followed', ->
      @followArtistCollection.addRepoArtists new Artists([
        new Artist { id: 'moo', title: 'Moo' }
        new Artist { id: 'boo', title: 'Boo' }
        new Artist { id: 'gar', title: 'Gar' }
      ])
      url = @followArtistCollection.url
      response = [200, {"Content-Type": "application/json"}, '{[ { "id": "boo", "title": "Boo" } ]}']
      server.respondWith("GET", "#{url}?artists[]=moo&artists[]=boo&artists[]=gar", response)
      @followArtistCollection.syncFollowedArtists()
      server.respond()
      @followArtistCollection.get('artists').get('boo').should.be.true
      @followArtistCollection.get('artists').get('moo').should.be.false

    xit 'cleans up when all follows are fetched', ->
      @followArtistCollection.syncFollowedArtists()
      @followArtistCollection.allFetched.should.be.false

      @followArtistCollection.syncFollowedArtists()
      @followArtistCollection.allFetched.should.be.true
      @followArtistCollection.unfollowedCache.length.should.equal 0
      @followArtistCollection.pendingRequests.length.should.equal 0
      @followArtistCollection.completedRequests.length.should.equal 0

  describe 'processRequests', ->

    xit 'makes multiple requests determined by @requestSlugMax', ->
      @followArtistCollection.artistIdsToSync = sinon.stub().returns(['moo', 'foo', 'bar'])
      @followArtistCollection.syncFollowedArtists()
      @followArtistCollection.requestSlugMax = 2
