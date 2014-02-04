Backbone    = require 'backbone'
sinon       = require 'sinon'
CurrentUser = require '../../models/current_user'
fabricate   = require('antigravity').fabricate
should      = require 'should'

describe 'CurrentUser', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'

  afterEach ->
    Backbone.sync.restore()

  describe '#defaultArtworkCollection', ->

    it 'throws a sensible error when you forget to initialize artwork collections', ->
      (=> @user.defaultArtworkCollection()).should.throw /Must call/

  describe "#sync", ->

    it 'injects the access token into sync', ->
      @user.set accessToken: 'foobar'
      @user.fetch()
      Backbone.sync.args[0][2].data.access_token.should.equal 'foobar'

    it 'doesnt override model data for create/update', ->
      @user.set accessToken: 'foobar', foo: 'bar'
      @user.save()
      Backbone.sync.args[0][2].attrs.foo.should.equal 'bar'

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