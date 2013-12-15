CurrentUser = require '../../models/current_user'
fabricate = require('antigravity').fabricate
sinon = require 'sinon'
Backbone = require 'backbone'
benv = require 'benv'

describe 'CurrentUser', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  after benv.teardown

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

    xit 'makes the correct API call to retreive a list of artists the user is following', ->
      @user.followingArtists()
      Backbone.sync.args[0][0].should.equal 'read'

  describe '#followArtist', ->

    it 'makes the correct API call to follow an artist', ->
      @user.followArtist 'foo-bar', null
      Backbone.sync.args[0][1].attributes.artist_id.should.equal 'foo-bar'
      Backbone.sync.args[0][0].should.equal 'create'
