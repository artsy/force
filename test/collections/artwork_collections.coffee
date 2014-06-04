Backbone = require 'backbone'
sinon = require 'sinon'
CurrentUser = require '../../models/current_user'
ArtworkCollections = require '../../collections/artwork_collections'
{ fabricate } = require 'antigravity'

describe 'ArtworkCollections', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'
    @collections = new ArtworkCollections [], user: @user

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets the artworks and url when adding a collection', ->
      @collections.add { id: 'saved-artwork' }
      @collections.first().url().should.include '/api/v1/collection/saved-artwork?user_id=' + @user.id
      @collections.first().artworks.url.should.include '/api/v1/collection/saved-artwork/artworks'

  describe '#saveArtwork', ->

    it 'saves the artwork to the collection', ->
      @collections.add { id: 'saved-artwork' }
      @collections.first().saveArtwork 'foo-bar'
      Backbone.sync.args[0][2].url.should
        .include '/api/v1/collection/saved-artwork/artwork/foo-bar?user_id=' + @user.id

  describe 'comparator', ->

    it 'orders the saved-artwork first', ->
      @collections.reset [{ id: 'foo' }, { id: 'bar' }, { id: 'saved-artwork'}, { id: 'baz' }]
      @collections.first().get('id').should.equal 'saved-artwork'