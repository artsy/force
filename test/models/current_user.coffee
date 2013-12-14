CurrentUser = require '../../models/current_user'
fabricate = require('antigravity').fabricate
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'CurrentUser', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'

  afterEach ->
    Backbone.sync.restore()

  describe "#sync", ->

    it 'injects the access token into sync', ->
      @user.set accessToken: 'foobar'
      @user.fetch()
      Backbone.sync.args[0][2].data.access_token.should.equal 'foobar'

  describe '#savedArtwork', ->

    it 'passess true to success cb if the user has saved the given artwork', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty', success: (saved) ->
        saved.should.be.ok
      )
      Backbone.sync.args[0][2].success [ fabricate 'artwork' ]

    it 'passes false to success cb if the user has not saved the given work', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty',
        success: (saved) ->
          saved.should.not.be.ok
        error: (msg) ->
          msg.should.not.be.ok
      )

      Backbone.sync.args[0][2].success [  ]

    it 'when the collection is not found, false is passed to the success cb', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty',
        success: (saved) ->
          saved.should.not.be.ok
        error: (msg) ->
          msg.should.not.be.ok
      )
      Backbone.sync.args[0][2].error { responseText: "Collection not found" }

    it 'calls the error cb for other errors', ->
      @user.set 'id': 'current-user'
      @user.savedArtwork('bitty',
        error: (msg) ->
          msg.should.be.ok
        success: (msg) ->
          msg.should.not.be.ok
      )
      Backbone.sync.args[0][2].error { responseText: 'Unauthorized' }

  describe '#saveArtwork', ->

    it 'makes the correct api call if the current user id is set', ->
      @user.set 'id': 'bitty'
      @user.saveArtwork('masterpiece', null)
      Backbone.sync.args[0][0].should.equal 'create'

  describe '#removeArtwork', ->

    it 'makes the correct api call if the current user id is set', ->
      @user.set 'id': 'bitty'
      @user.removeArtwork('masterpiece', null)
      Backbone.sync.args[0][0].should.equal 'delete'

  describe '#followingArtists', ->
    it 'makes the correct API call to retreive a list of artists the user is following', ->
      @user.followingArtists()
      Backbone.sync.args[0][0].should.equal 'read'

  describe '#followArtist', ->
    it 'makes the correct API call to follow an artist', ->
      @user.followArtist 'foo-bar', null
      Backbone.sync.args[0][1].attributes.artist_id.should.equal 'foo-bar'
      Backbone.sync.args[0][0].should.equal 'create'
