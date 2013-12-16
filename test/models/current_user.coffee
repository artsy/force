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

  describe '#saveArtwork', ->

    it 'makes the correct api call', ->
      @user.initializeDefaultArtworkCollection()
      @user.saveArtwork('masterpiece', null)
      Backbone.sync.args[1][0].should.equal 'create'

  describe '#removeArtwork', ->

    it 'makes the correct api call', ->
      @user.initializeDefaultArtworkCollection()
      @user.removeArtwork('masterpiece', null)
      Backbone.sync.args[1][0].should.equal 'delete'
