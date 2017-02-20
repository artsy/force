_ = require 'underscore'
CurrentUser = require '../../models/current_user'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'CurrentUser', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'

  afterEach ->
    Backbone.sync.restore()

  describe '#sync', ->
    it 'does the right thing for fetch/save', ->
      @user.save()
      _.isUndefined(Backbone.sync.args[0][2].data).should.be.true()
      @user.fetch()
      _.keys(Backbone.sync.args[1][2].data).should.containEql 'access_token'

  describe '#registeredForAuction', ->

    describe 'when a user is not registered', ->
      it 'returns false', (done) ->
        @user.registeredForAuction 'foobar-auction', success: (boolean) ->
          boolean.should.be.false()
          done()
        Backbone.sync.args[0][2].data.sale_id.should.equal 'foobar-auction'
        Backbone.sync.args[0][2].success []

    describe 'when a user is registered', ->
      it 'returns true', (done) ->
        @user.registeredForAuction 'foobar-auction-registered', success: (boolean) ->
          boolean.should.be.true()
          done()
        Backbone.sync.args[0][2].data.sale_id.should.equal 'foobar-auction-registered'
        Backbone.sync.args[0][2].success [{ id: 'existy' }]

    it 'when given a user is logged out error soaks it up and returns false', (done) ->
      @user.registeredForAuction 'foobar', success: (registered) ->
        registered.should.equal false
        done()
      Backbone.sync.args[0][2].error { responseText: "A user is required" }

  describe '#fetchQualifiedBidder', ->
    describe 'when a user has no bidders', ->
      it 'returns false', (done) ->
        @user.fetchQualifiedBidder 'foobar-auction', success: (bool) ->
          bool.should.be.false()
          done()
        Backbone.sync.args[0][2].success []

    describe 'when a user has no bidders for the auction', ->
      it 'returns false', (done) ->
        bidder = {
          id: 'me',
          qualified_for_bidding: true
          sale: {
            id: 'nothing'
          }
        }
        @user.fetchQualifiedBidder 'foobar-auction', success: (bool) ->
          bool.should.be.false()
          done()
        Backbone.sync.args[0][2].success [bidder]

    describe 'when a user is qualified', ->
      it 'returns true', (done) ->
        bidder = {
          id: 'me',
          qualified_for_bidding: true
          sale: {
            id: 'foobar-auction'
          }
        }
        @user.fetchQualifiedBidder 'foobar-auction', success: (bool) ->
          bool.should.be.true()
          done()
        Backbone.sync.args[0][2].success [bidder]

    describe 'when a user is not qualified', ->
      it 'returns false', (done) ->
        bidder = {
          id: 'me',
          qualified_for_bidding: false
          sale: {
            id: 'foobar-auction'
          }
        }
        @user.fetchQualifiedBidder 'foobar-auction', success: (bool) ->
          bool.should.be.false()
          done()
        Backbone.sync.args[0][2].success [bidder]

  describe '#placeBid', ->

    it 'creates a new bid position given the right params'

  describe '#savedArtwork', ->

    it 'passess true to success cb if the user has saved the given artwork', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty', success: (saved) ->
        saved.should.be.ok()
      )
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user'
      Backbone.sync.args[0][2].success [ fabricate 'artwork' ]

    it 'passes false to success cb if the user has not saved the given work', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty',
        success: (saved) ->
          saved.should.not.be.ok()
        error: (msg) ->
          msg.should.not.be.ok()
      )
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user'
      Backbone.sync.args[0][2].success [  ]

    it 'when the collection is not found, false is passed to the success cb', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty',
        success: (saved) ->
          saved.should.not.be.ok()
        error: (msg) ->
          msg.should.not.be.ok()
      )
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user'
      Backbone.sync.args[0][2].error { responseText: "Collection not found" }

    it 'calls the error cb for other errors', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty',
        error: (msg) ->
          msg.should.be.ok()
        success: (msg) ->
          msg.should.not.be.ok()
      )
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user'
      Backbone.sync.args[0][2].error { responseText: 'Unauthorized' }

  describe '#saveArtwork', ->

    it 'makes the correct api call if the current user id is set', ->
      @user.set 'id': 'bitty'
      @user.saveArtwork('masterpiece', null)
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artwork/masterpiece?user_id=bitty'
      Backbone.sync.args[0][0].should.equal 'create'

  describe '#removeArtwork', ->

    it 'makes the correct api call if the current user id is set', ->
      @user.set 'id': 'bitty'
      @user.removeArtwork('masterpiece', null)
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artwork/masterpiece?user_id=bitty'
      Backbone.sync.args[0][0].should.equal 'delete'

  describe '#followingArtists', ->
    it 'makes the correct API call to retreive a list of artists the user is following', ->
      @user.followingArtists()
      Backbone.sync.args[0][0].should.equal 'read'
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/follow/artists'

  describe '#followArtist', ->
    it 'makes the correct API call to follow an artist', ->
      @user.followArtist 'foo-bar', null
      Backbone.sync.args[0][1].attributes.artist_id.should.equal 'foo-bar'
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/follow/artist'
      Backbone.sync.args[0][0].should.equal 'create'
