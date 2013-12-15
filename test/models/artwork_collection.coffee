sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
Artwork = require '../../models/artwork'
Artworks = require '../../collections/artworks'
ArtworkCollection = require '../../models/artwork_collection'
CurrentUser = require '../../models/current_user'
benv = require 'benv'
sd = require('sharify').data

{ fabricate } = require 'antigravity'

describe 'ArtworkCollection', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      @ajaxSpy = sinon.spy $, 'ajax'
      done()

  after benv.teardown

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @currentUser = new CurrentUser(id: "user_id", email: "a@b.c")
    sd.GRAVITY_URL = "http://localhost:5000/__api"
    sd.currentUserModel = @currentUser
    sd.NODE_ENV = 'test'
    @artworkCollection = new ArtworkCollection(userId: @currentUser.get('id'))
    @artworks = new Artworks
    @artworks.add [
      new Artwork { id: 'foo', title: 'Foo' }
      new Artwork { id: 'bar', title: 'Bar' }
    ]
    @artworkCollection.get('artworks').add @artworks.models
    @artworkCollection.addRepoArtworks @artworks

  afterEach ->
    Backbone.sync.restore()

  describe 'saveArtwork', ->

    it 'adds artwork to the saved artworks collection', ->
      artwork = new Artwork { id: 'baz', title: 'Baz' }
      len = @artworkCollection.get('artworks').length
      @artworkCollection.saveArtwork artwork.get('id')
      @artworkCollection.isSaved(artwork).should.be.true
      @artworkCollection.get('artworks').length.should.equal len + 1

    xit 'makes an API request to sync the action', ->
      artwork = new Artwork { id: 'baz', title: 'Baz' }
      @artworkCollection.saveArtwork artwork.get('id')
      @ajaxSpy.args[0][0].should.include '/api/v1/collection/saved-artwork/artwork/baz'

    it 'can trigger add events for a specific artwork', ->
      specificArtworkAddedCalls = 0
      artwork = new Artwork({ id: 'baz', title: 'Baz' })
      @artworkCollection.on "add:#{artwork.get('id')}", -> specificArtworkAddedCalls += 1
      @artworkCollection.saveArtwork artwork.get('id')
      setTimeout ->
        specificArtworkAddedCalls.should.equal 1
      , 100

    it 'can accept a silent option to prevent event triggers', ->
      artworkAddedCalls = 0
      specificArtworkAddedCalls = 0
      artwork = new Artwork({ id: 'baz', title: 'Baz' })
      @artworkCollection.on 'add', -> artworkAddedCalls += 1
      @artworkCollection.on "add:#{artwork.get('id')}", -> specificArtworkAddedCalls += 1
      @artworkCollection.saveArtwork artwork.get('id'), { silent: true }
      setTimeout ->
        artworkAddedCalls.should.equal 0
        specificArtworkAddedCalls.should.equal 0
      , 100

  describe 'unsaveArtwork', ->

    it 'removes artwork from the saved artworks artworkCollection', ->
      artwork = @artworkCollection.get('artworks').first()
      len = @artworkCollection.get('artworks').length
      @artworkCollection.unsaveArtwork artwork.get('id')
      @artworkCollection.isSaved(artwork).should.be.false
      @artworkCollection.get('artworks').length.should.equal len - 1

    xit 'makes an API request to sync the action', ->
      artwork = @artworkCollection.get('artworks').first()
      @artworkCollection.unsaveArtwork artwork.get('id')
      @ajaxSpy.args[0][0].should.include '/api/v1/collection/saved-artwork/artwork/baz'

    it 'can trigger remove events for a specific artwork', ->
      specificArtworkRemovedCalls = 0
      artwork = @artworkCollection.get('artworks').first()
      @artworkCollection.on "remove:#{artwork.get('id')}", -> specificArtworkRemovedCalls += 1
      @artworkCollection.unsaveArtwork artwork.get('id')
      setTimeout ->
        specificArtworkRemovedCalls.should.equal 1
      , 100

    it 'can accept a silent option to prevent event triggers', ->
      artworkRemovedCalls = 0
      specificArtworkRemovedCalls = 0
      artwork = @artworkCollection.get('artworks').first()
      @artworkCollection.on 'remove', -> artworkRemovedCalls += 1
      @artworkCollection.on "remove:#{artwork.get('id')}", -> specificArtworkRemovedCalls += 1
      @artworkCollection.unsaveArtwork artwork.get('id'), { silent: true }
      setTimeout ->
        artworkRemovedCalls.should.equal 0
        specificArtworkRemovedCalls.should.equal 0
      , 100

  describe 'isSaved', ->

    it 'determines if an artwork is in the user\'s saved artworks artworkCollection', ->
      unsavedArtwork = new Artwork({ id: 'baz', title: 'Baz' })
      savedArtwork   = @artworkCollection.get('artworks').first()
      @artworkCollection.isSaved(unsavedArtwork).should.be.false
      @artworkCollection.isSaved(savedArtwork).should.be.true

  describe 'broadcastSaved', ->

    it 'triggers an artwork specific add for all artworks in the artworkCollection', ->
      specificArtworkAddedCalls = 0
      a1 = @artworkCollection.get('artworks').at 0
      a2 = @artworkCollection.get('artworks').at 1
      @artworkCollection.on "add:#{a1.get('id')}", -> specificArtworkAddedCalls += 1
      @artworkCollection.on "add:#{a2.get('id')}", -> specificArtworkAddedCalls += 1
      @artworkCollection.broadcastSaved()
      setTimeout ->
        specificArtworkAddedCalls.should.equal 2
      , 100

  describe 'artworkIdsToSync', ->

    it 'returns all artwork ids that need a server check to determine if saved', ->
      @artworkCollection.addRepoArtworks new Artworks([
        new Artwork { id: 'moo', title: 'Moo' }
        new Artwork { id: 'gar', title: 'Gar' }
      ])
      @artworkCollection.artworkIdsToSync()[0].should.equal 'moo'
      @artworkCollection.artworkIdsToSync()[1].should.equal 'gar'

      @artworkCollection.get('artworks').add new Artwork({ id: 'moo', title: 'Moo' })
      @artworkCollection.artworkIdsToSync()[0].should.equal 'gar'
      @artworkCollection.artworkIdsToSync().length.should.equal 1


  describe 'syncSavedArtworks', ->

    xit 'requests the difference between this artworkCollection and the application artworks repository to determine what\'s saved', ->
      @artworkCollection.addRepoArtworks new Artworks([
        new Artwork { id: 'moo', title: 'Moo' }
        new Artwork { id: 'boo', title: 'Boo' }
        new Artwork { id: 'gar', title: 'Gar' }
      ])
      url = @artworkCollection.url
      response = [200, {"Content-Type": "application/json"}, '{[ { "id": "boo", "title": "Boo" } ]}']
      server.respondWith("GET", "#{url}?artworks[]=moo&artworks[]=boo&artworks[]=gar", response)
      @artworkCollection.syncSavedArtworks()
      server.respond()
      @artworkCollection.get('artworks').get('boo').should.be.true
      @artworkCollection.get('artworks').get('moo').should.be.false

    xit 'cleans up when all saves are fetched', ->
      @artworkCollection.syncSavedArtworks()
      @artworkCollection.allFetched.should.be.false

      @artworkCollection.syncSavedArtworks()
      @artworkCollection.allFetched.should.be.true
      @artworkCollection.unsavedCache.length.should.equal 0
      @artworkCollection.pendingRequests.length.should.equal 0
      @artworkCollection.completedRequests.length.should.equal 0

  describe 'processRequests', ->

    it 'makes multiple requests determined by @requestSlugMax', ->
      @artworkCollection.artworkIdsToSync = sinon.stub().returns(['moo', 'foo', 'bar'])
      @artworkCollection.syncSavedArtworks()
      @artworkCollection.requestSlugMax = 2
