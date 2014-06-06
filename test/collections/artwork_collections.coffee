Backbone = require 'backbone'
sinon = require 'sinon'
CurrentUser = require '../../models/current_user'
ArtworkCollections = require '../../collections/artwork_collections'
Artwork = require '../../models/artwork'
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
      @collections.first().saveArtwork new Artwork id: 'foo-bar'
      Backbone.sync.args[0][2].url.should
        .include '/api/v1/collection/saved-artwork/artwork/foo-bar?user_id=' + @user.id

    it 'adds the artwork to the collections artworks', ->
      @collections.add { id: 'saved-artwork' }
      @collections.first().saveArtwork new Artwork id: 'foo-bar'
      @collections.first().artworks.first().get('id').should.equal 'foo-bar'

  describe 'comparator', ->

    it 'orders the saved-artwork first', ->
      @collections.reset [{ id: 'foo' }, { id: 'bar' }, { id: 'saved-artwork'}, { id: 'baz' }]
      @collections.first().get('id').should.equal 'saved-artwork'